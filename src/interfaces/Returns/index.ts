export type OrderStatus =
  | 'in-progress'
  | 'pending'
  | 'confirmed'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderId: string;
  date: string;
  status: OrderStatus;
  packageCount: number;
  pickupAddress: string;
  timeWindow: string;
}

export type TabType = 'current' | 'scheduled' | 'completed';
