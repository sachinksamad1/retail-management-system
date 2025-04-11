// src/app/core/models/promotion.model.ts
export interface Promotion {
    id: number;
    promo_code: string;
    description: string;
    discount_percentage: number;
    valid_from: Date;
    valid_until: Date;
    created_at: Date;
    updated_at: Date;
  }