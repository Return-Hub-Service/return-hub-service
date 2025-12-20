export type DriverStatusType =
  | 'on-the-way'
  | 'picked-up'
  | 'delivered'
  | 'returned'
  | 'complete';

export interface PackageItem {
  id: string;
  packageId: string;
  customerName: string;
  unit: string;
  carrier: string;
  trackingNumber?: string;
  isChecked: boolean;
}

export interface RouteInfo {
  driverName: string;
  routeName: string;
  pickupAddress: string;
  dropoffAddress: string;
}
