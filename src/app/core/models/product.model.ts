// src/app/core/models/product.model.ts
export interface Product {
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