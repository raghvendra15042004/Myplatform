import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from './auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return auth.refreshToken().pipe(
          switchMap(res => {
            return next(req.clone({
              setHeaders: { Authorization: `Bearer ${res.access_token}` }
            }));
          }),
          catchError(refreshErr => {
            auth.logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};