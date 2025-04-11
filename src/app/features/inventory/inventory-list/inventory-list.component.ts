// src/app/features/inventory/inventory-list/inventory-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Inventory } from '../../../core/models/inventory.model';
import { InventoryService } from '../../../core/services/inventory.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventory$: Observable<Inventory[]>;
  isLoading = false;

  tableColumns = [
    { key: 'product_name', header: 'Product Name' },
    { key: 'price', header: 'Price', cell: (item: Inventory) => `$${item.price.toFixed(2)}` },
    { key: 'stock_quantity', header: 'Stock' },
    { key: 'restock_threshold', header: 'Restock At' },
    { key: 'created_at', header: 'Created At', cell: (item: Inventory) => new Date(item.created_at).toLocaleDateString() }
  ];

  tableActions = [
    { 
      label: 'Edit', 
      icon: 'edit', 
      action: (item: Inventory) => this.router.navigate(['/inventory', item.id, 'edit']) 
    },
    { 
      label: 'Delete', 
      icon: 'delete', 
      action: (item: Inventory) => this.confirmDelete(item) 
    }
  ];

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.isLoading = true;
    this.inventory$ = this.inventoryService.getInventory();
    this.isLoading = false;
  }

  onRowClick(item: Inventory): void {
    this.router.navigate(['/inventory', item.id]);
  }

  confirmDelete(item: Inventory): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete ${item.product_name}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteInventoryItem(item.id);
      }
    });
  }

  deleteInventoryItem(id: number): void {
    this.inventoryService.deleteInventoryItem(id).subscribe(
      () => {
        this.snackBar.open('Item deleted successfully', 'Close', {
          duration: 3000
        });
        this.loadInventory();
      },
      error => {
        this.snackBar.open('Error deleting item', 'Close', {
          duration: 3000
        });
        console.error('Error deleting item:', error);
      }
    );
  }

  addNewItem(): void {
    this.router.navigate(['/inventory/new']);
  }
}
