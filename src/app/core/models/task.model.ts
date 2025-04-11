// src/app/core/models/task.model.ts
export interface Task {
    id: number;
    tax_rate: number;
    region: string;
    effective_date: Date;
    created_at: Date;
    updated_at: Date;
  }