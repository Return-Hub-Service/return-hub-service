export interface ContactInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface PickupAddress {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PackageInfo {
  id: string;
  carrier: string;
  trackingNumber?: string;
  size: string;
  weight: string;
  images?: File[];
  qrCode?: File;
}

export interface PickupPreferences {
  preferredDate: string;
  timeWindow: string;
  packageLocation: string;
  additionalNotes?: string;
}

export interface SchedulePickupFormData {
  contact: ContactInfo;
  address: PickupAddress;
  packages: PackageInfo[];
  preferences: PickupPreferences;
}

export interface DateOption {
  label: string;
  date: string;
  isAvailable: boolean;
}
