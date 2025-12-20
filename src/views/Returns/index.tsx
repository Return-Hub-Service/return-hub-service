'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconPlus, IconPackageOff } from '@tabler/icons-react';
import SecondaryNav from '@/src/components/SecondaryNav';
import OrderCard from '@/src/components/OrderCard';
import EmptyState from '@/src/components/EmptyState';
import Button from '@/src/components/Button';
import { TabType } from '@/src/interfaces/Returns';
import { mockOrders } from './mockData';
import styles from './Returns.module.css';

export default function ReturnsView() {
  const [activeTab, setActiveTab] = useState<TabType>('current');

  const currentOrders = mockOrders.filter((order) =>
    ['in-progress'].includes(order.status)
  );

  const scheduledOrders = mockOrders.filter((order) =>
    ['pending', 'confirmed'].includes(order.status)
  );

  const completedOrders = mockOrders.filter((order) =>
    ['delivered', 'cancelled'].includes(order.status)
  );

  const getOrdersByTab = () => {
    switch (activeTab) {
      case 'current':
        return currentOrders;
      case 'scheduled':
        return scheduledOrders;
      case 'completed':
        return completedOrders;
      default:
        return [];
    }
  };

  const orders = getOrdersByTab();

  return (
    <>
      <SecondaryNav userName="Jonathan" />
      <main className={styles.mainContent}>
        <div className={styles.pageContainer}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>My Returns</h1>
            <p className={styles.pageSubtitle}>
              Track and manage your package return pickups
            </p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'current' ? styles.active : ''}`}
              onClick={() => setActiveTab('current')}
            >
              Current
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'scheduled' ? styles.active : ''}`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'completed' ? styles.active : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>

          <div className={styles.ordersList}>
            {orders.length > 0 ? (
              orders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyState
                icon={<IconPackageOff size={64} />}
                title="No orders found"
                message={`You don't have any ${activeTab} orders at the moment.`}
                action={
                  <Link href="/schedule-pickup">
                    <Button variant="primary" size="lg">
                      Schedule a Pickup
                    </Button>
                  </Link>
                }
              />
            )}
          </div>

          <div className={styles.newReturnSection}>
            <Link href="/schedule-pickup">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<IconPlus size={20} />}
              >
                New Return Request
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
