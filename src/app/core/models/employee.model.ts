// src/app/core/models/employee.model.ts
export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  }