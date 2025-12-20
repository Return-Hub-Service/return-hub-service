import DriverStatusView from '@/src/views/DriverStatus';

export default async function DriverOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // In a real app, would fetch order data based on id
  return <DriverStatusView />;
}
