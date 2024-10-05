// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID = 'user_id';
  private readonly USER_ROLE = 'user_role';

  constructor(private router: Router) {}

  setToken(token: string, id: string | number, role: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ID, String(id));
    localStorage.setItem(this.USER_ROLE, role);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole() {
    return localStorage.getItem('userRole');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
