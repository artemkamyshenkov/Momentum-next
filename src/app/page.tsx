import { Clock } from '@/components/Clock';
import { Date } from '@/components/Date';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.dateContainer}>
        <Clock />
        <Date />
      </div>
    </main>
  );
}
