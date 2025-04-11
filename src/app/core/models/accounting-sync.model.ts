// src/app/core/models/accounting-sync.model.ts
export interface AccountingSync {
    id: number;
    sale_id: number;
    synced_to_accounting: boolean;
    synced_at: Date;
    created_at: Date;
    updated_at: Date;
  }