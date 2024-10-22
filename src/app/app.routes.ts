import { Routes } from '@angular/router';
import { mainRoutes } from '../app/main/main.routing';
import { outRoutes } from '../app/out/out.routing';

export const routes: Routes = [
  {
    path: 'out',
    loadComponent: () =>
      import('./out/out.component').then((m) => m.OutComponent),
    children: [
      ...outRoutes,
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./main/main.component').then((m) => m.MainComponent),
    children: [
      ...mainRoutes,
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'out/login',
    pathMatch: 'full',
  },
];
