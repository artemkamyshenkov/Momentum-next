import { Clock } from '@/components/Clock';
import { Date } from '@/components/Date';
import { Greet } from '@/components/Greet';
import { MainGoal } from '@/components/MainGoal';
import { QuoteDay } from '@/components/QuoteDay';
import { Weather } from '@/components/Weather';
import './owfont-regular.css';
import styles from './page.module.scss';

// TODO: Refactor
export default async function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.weatherContainer}>
        <Weather />
      </div>
      <div className={styles.mainContent}>
        <Clock />
        <Date />
        <Greet />
        <MainGoal />
        <QuoteDay />
      </div>
    </main>
  );
}
