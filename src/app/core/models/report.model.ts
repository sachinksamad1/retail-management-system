// src/app/core/models/report.model.ts
export interface Report {
    id: number;
    report_date: Date;
    total_sales: number;
    total_returns: number;
    created_at: Date;
    updated_at: Date;
  }