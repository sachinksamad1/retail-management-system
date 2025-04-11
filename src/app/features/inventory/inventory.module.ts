// src/app/features/inventory/inventory.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';

const routes: Routes = [
  { path: '', component: InventoryListComponent },
  { path: 'new', component: InventoryFormComponent },
  { path: ':id', component: InventoryDetailComponent },
  { path: ':id/edit', component: InventoryFormComponent }
];

@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryDetailComponent,
    InventoryFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
