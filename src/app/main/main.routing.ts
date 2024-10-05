import { Routes } from '@angular/router';
import { OutHomeComponent } from './pages/out-home/out-home.component';

export const mainRoutes: Routes = [
  { path: 'home', component: OutHomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
