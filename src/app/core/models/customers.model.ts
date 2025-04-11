// src/app/core/models/customer.model.ts
export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    loyalty_points: number;
    created_at: Date;
    updated_at: Date;
  }