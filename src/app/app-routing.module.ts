// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory',
    loadChildren: () => import('./features/inventory/inventory.module').then(m => m.InventoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'returns',
    loadChildren: () => import('./features/returns/returns.module').then(m => m.ReturnsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'promotions',
    loadChildren: () => import('./features/promotions/promotions.module').then(m => m.PromotionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./features/supplier-management/supplier-management.module').then(m => m.SupplierManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    loadChildren: () => import('./features/locations/locations.module').then(m => m.LocationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
