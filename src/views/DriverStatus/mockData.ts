import {
  PackageItem,
  RouteInfo,
} from '@/src/interfaces/DriverStatus';

export const mockRouteInfo: RouteInfo = {
  driverName: 'Michael Chen',
  routeName: 'Sunset Heights',
  pickupAddress: '123 Main Street, Apt 4B\nHendersonville, NC 28792',
  dropoffAddress: 'UPS Store #1234\n456 Commerce Dr, Hendersonville, NC 28792',
};

export const mockPackages: PackageItem[] = [
  {
    id: '1',
    packageId: 'PKG-2025-001',
    customerName: 'John Doe',
    unit: 'Apt 4B',
    carrier: 'Amazon',
    trackingNumber: '1Z999AA10123456784',
    isChecked: true,
  },
  {
    id: '2',
    packageId: 'PKG-2025-002',
    customerName: 'Jane Smith',
    unit: 'Apt 2A',
    carrier: 'FedEx',
    trackingNumber: '774901238456',
    isChecked: true,
  },
  {
    id: '3',
    packageId: 'PKG-2025-003',
    customerName: 'Mike Johnson',
    unit: 'Apt 7C',
    carrier: 'UPS',
    trackingNumber: '1Z5338FF0107231640',
    isChecked: true,
  },
  {
    id: '4',
    packageId: 'PKG-2025-004',
    customerName: 'Sarah Lee',
    unit: 'Apt 5D',
    carrier: 'USPS',
    trackingNumber: undefined,
    isChecked: true,
  },
];
