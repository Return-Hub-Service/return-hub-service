import { OrderStatus } from '@/src/interfaces/Returns';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  'in-progress': { label: 'In Progress', className: styles.inProgress },
  pending: { label: 'Pending', className: styles.pending },
  confirmed: { label: 'Confirmed', className: styles.confirmed },
  delivered: { label: 'Delivered', className: styles.delivered },
  cancelled: { label: 'Cancelled', className: styles.cancelled },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`${styles.statusBadge} ${config.className}`}>
      {config.label}
    </span>
  );
}
