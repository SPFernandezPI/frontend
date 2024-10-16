import { Routes } from '@angular/router';
import { OutHomeComponent } from './pages/out-home/out-home.component';
import { ProductByCategoriesComponent } from './pages/product-by-categories/product-by-categories.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductFavoritesComponent } from './pages/product-favorites/product-favorites.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';

export const mainRoutes: Routes = [
  { path: 'home', component: OutHomeComponent },
  { path: 'admin', component: DashboardAdminComponent },
  { path: 'product/details', component: ProductDetailsComponent },
  { path: 'product/byCategories', component: ProductByCategoriesComponent },
  { path: 'product/favorites', component: ProductFavoritesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
