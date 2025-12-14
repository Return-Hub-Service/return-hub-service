export default async function DriverOrder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>Driver Order {id}</div>;
}
