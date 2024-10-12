import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID = 'user_id';
  private readonly USER_ROLE = 'user_role';

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private router: Router, private http: HttpClient) {}

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
    this.router.navigateByUrl('/out/login');
  }

  login(credentials: { mail_Usuario: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/api/Accesos/Login`, credentials);
  }

  register(credentials: {
    id_Usuario: number;
    nombre_Usuario: string;
    mail_Usuario: string;
    password: string;
    id_Rol: number;
    rolDescripcion: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/Accesos/registro`,
      credentials
    );
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(value)
    ) {
      return { passwordComplexity: true };
    }
    return null;
  }
}
