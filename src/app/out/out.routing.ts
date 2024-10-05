import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';

export const outRoutes: Routes = [
  { path: 'login', component: LoginRegisterComponent },
  { path: '**', redirectTo: 'out' },
];
