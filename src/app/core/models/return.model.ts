// src/app/core/models/return.model.ts
export interface Return {
    id: number;
    sale_id: number;
    return_date: Date;
    return_reason: string;
    refund_amount: number;
    status: string;
    created_at: Date;
    updated_at: Date;
  }