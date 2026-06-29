import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const required: string[] = route.data['roles'] ?? [];
  const allowed = required.some(r => auth.hasRole(r));

  if (allowed) return true;
  router.navigate(['/login']);
  return false;
};