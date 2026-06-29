import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: { id: string; name: string; roles: string[] };
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUser(): { id: string; name: string; roles: string[] } | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    return this.getUser()?.roles.includes(role) ?? false;
  }

  refreshToken(): Observable<{ access_token: string }> {
    const refresh_token = localStorage.getItem('refresh_token');
    return this.http.post<{ access_token: string }>(
      `${this.authUrl}/refresh`, { refresh_token }
    ).pipe(
      tap(res => localStorage.setItem('access_token', res.access_token))
    );
  }
}