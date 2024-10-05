import { Routes } from '@angular/router';
import { mainRoutes } from '../app/main/main.routing';
import { outRoutes } from '../app/out/out.routing';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('./main/main.component').then((m) => m.MainComponent),
    children: mainRoutes,
  },
  {
    path: 'out',
    loadComponent: () =>
      import('./out/out.component').then((m) => m.OutComponent),
    children: outRoutes,
  },
];
