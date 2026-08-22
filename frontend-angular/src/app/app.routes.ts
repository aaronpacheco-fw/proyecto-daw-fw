import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { ClientLayout } from './layout/client-layout/client-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Trabajadores } from './pages/trabajadores/trabajadores';
import { ProductosAdmin } from './pages/productos-admin/productos-admin';
import { Almacen } from './pages/almacen/almacen';
import { Compras } from './pages/compras/compras';
import { Catalogo } from './pages/catalogo/catalogo';
import { Carrito } from './pages/carrito/carrito';
import { MisCompras } from './pages/mis-compras/mis-compras';
import { Checkout } from './pages/checkout/checkout';
import { authGuard } from './guards/auth-guard';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: ClientLayout,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: Inicio },
      { path: 'catalogo', component: Catalogo },
      { path: 'carrito', component: Carrito },
      { path: 'checkout', component: Checkout },
      { path: 'mis-compras', component: MisCompras },
    ],
  },
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

  // Cambiamos esto de 'catalogo' a 'inicio' para que la raíz siempre empiece bien
  { path: '**', redirectTo: 'inicio' },
];
