import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Trabajadores } from './pages/trabajadores/trabajadores';
import { ProductosAdmin } from './pages/productos-admin/productos-admin';
import { Almacen } from './pages/almacen/almacen';
import { Compras } from './pages/compras/compras';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      { path: 'panel', component: Dashboard },
      { path: 'trabajadores', component: Trabajadores },
      { path: 'productos', component: ProductosAdmin },
      { path: 'almacen', component: Almacen },
      { path: 'compras', component: Compras },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
