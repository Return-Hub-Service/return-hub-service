export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
}

export interface AddressSuggestion {
  id: string;
  main: string;
  sub: string;
  fullAddress: Address;
}
