import { IconPackage } from '@tabler/icons-react';
import StatusBadge from '@/src/components/StatusBadge';
import { Order } from '@/src/interfaces/Returns';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div>
          <div className={styles.orderId}>{order.orderId}</div>
          <div className={styles.orderDate}>{order.date}</div>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Packages</span>
          <span className={styles.detailValue}>
            <IconPackage size={16} className={styles.packageIcon} />
            {order.packageCount} {order.packageCount === 1 ? 'package' : 'packages'}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Pickup Address</span>
          <span className={styles.detailValue}>{order.pickupAddress}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Time Window</span>
          <span className={styles.detailValue}>{order.timeWindow}</span>
        </div>
      </div>
    </div>
  );
}
