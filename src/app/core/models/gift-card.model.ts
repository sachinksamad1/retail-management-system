// src/app/core/models/gift-card.model.ts
export interface GiftCard {
    id: number;
    card_number: string;
    balance: number;
    customer_id: number;
    created_at: Date;
    updated_at: Date;
  }