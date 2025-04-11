// src/app/features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SalesSummaryComponent } from './components/sales-summary/sales-summary.component';
import { InventoryAlertComponent } from './components/inventory-alert/inventory-alert.component';
import { RecentSalesComponent } from './components/recent-sales/recent-sales.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    SalesSummaryComponent,
    InventoryAlertComponent,
    RecentSalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }