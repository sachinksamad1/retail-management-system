// src/app/core/models/sale.model.ts
export interface Sale {
    id: number;
    transaction_date: Date;
    customer_id: number;
    employee_id: number;
    total_amount: number;
    payment_method: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  }