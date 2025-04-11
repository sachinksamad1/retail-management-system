// src/app/core/models/user.model.ts
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  }