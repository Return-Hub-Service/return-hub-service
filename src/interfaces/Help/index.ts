export interface ContactMethod {
  type: 'phone' | 'email';
  value: string;
  icon: React.ReactNode;
  label: string;
}

export interface OperatingHours {
  weekday: string;
  weekend: string;
  closed: string;
  timezone: string;
}
