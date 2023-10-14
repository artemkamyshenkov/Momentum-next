import { Clock } from '@/components/Clock';
import { Date } from '@/components/Date';
import { Greet } from '@/components/Greet';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.mainContent}>
        <Clock />
        <Date />
        <Greet />
      </div>
    </main>
  );
}
