// src/app/core/models/inventory.model.ts
export interface Inventory {
    id: number;
    product_name: string;
    description: string;
    price: number;
    stock_quantity: number;
    restock_threshold: number;
    supplier_id: number;
    created_at: Date;
    updated_at: Date;
  }