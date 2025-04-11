// src/app/core/models/payment-method.model.ts
export interface PaymentMethod {
    id: number;
    method_name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  }