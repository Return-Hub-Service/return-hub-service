import { IconCheck } from '@tabler/icons-react';
import { DriverStatusType } from '@/src/interfaces/DriverStatus';
import styles from './Timeline.module.css';

interface TimelineProps {
  currentStatus: DriverStatusType;
}

const timelineSteps = [
  { id: 1, label: 'On the Way', status: 'on-the-way' },
  { id: 2, label: 'Picked Up', status: 'picked-up' },
  { id: 3, label: 'Delivered', status: 'delivered' },
  { id: 4, label: 'Returned', status: 'returned' },
];

const statusOrder: Record<DriverStatusType, number> = {
  'on-the-way': 0,
  'picked-up': 1,
  'delivered': 2,
  'returned': 2,
  complete: 3,
};

export default function Timeline({ currentStatus }: TimelineProps) {
  const currentIndex = statusOrder[currentStatus];

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineLine}>
        <div
          className={styles.timelineProgress}
          style={{
            width: `${(currentIndex / (timelineSteps.length - 1)) * 100}%`,
          }}
        />
      </div>
      <div className={styles.statusTimeline}>
        {timelineSteps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isReturnedPath = currentStatus === 'returned' && step.id === 4;

          return (
            <div key={step.id} className={styles.timelineStep}>
              <div
                className={`${styles.timelineDot} ${
                  isActive || isReturnedPath ? styles.active : ''
                } ${isCompleted ? styles.completed : ''}`}
              >
                {isCompleted ? <IconCheck size={16} /> : step.id}
              </div>
              <span
                className={`${styles.timelineLabel} ${
                  isActive || isReturnedPath ? styles.active : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
