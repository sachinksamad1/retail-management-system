// src/app/features/inventory/inventory-form/inventory-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Inventory } from '../../../core/models/inventory.model';
import { Supplier } from '../../../core/models/supplier.model';
import { InventoryService } from '../../../core/services/inventory.service';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  itemId: number;
  isLoading = false;
  suppliers$: Observable<Supplier[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private supplierService: SupplierService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.suppliers$ = this.supplierService.getSuppliers();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.itemId = +params['id'];
        this.loadInventoryItem(this.itemId);
      }
    });
  }

  createForm(): void {
    this.inventoryForm = this.fb.group({
      product_name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock_quantity: [0, [Validators.required, Validators.min(0)]],
      restock_threshold: [0, [Validators.required, Validators.min(0)]],
      supplier_id: [null, [Validators.required]]
    });
  }

  loadInventoryItem(id: number): void {
    this.isLoading = true;
    this.inventoryService.getInventoryItem(id).subscribe(
      item => {
        this.inventoryForm.patchValue(item);
        this.isLoading = false;
      },
      error => {
        this.snackBar.open('Error loading item', 'Close', {
          duration: 3000
        });
        this.isLoading = false;
        console.error('Error loading item:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formValue = this.inventoryForm.value;

    if (this.isEditMode) {
      this.inventoryService.updateInventoryItem(this.itemId, formValue).subscribe(
        () => this.handleSuccess('Item updated successfully'),
        error => this.handleError('Error updating item', error)
      );
    } else {
      this.inventoryService.createInventoryItem(formValue).subscribe(
        () => this.handleSuccess('Item created successfully'),
        error => this.handleError('Error creating item', error)
      );
    }
  }

  handleSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
    this.isLoading = false;
    this.router.navigate(['/inventory']);
  }

  handleError(message: string, error: any): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
    this.isLoading = false;
    console.error(message, error);
  }

  cancel(): void {
    this.router.navigate(['/inventory']);
  }
}
