import { Clock } from '@/components/Clock';
import { Date } from '@/components/Date';
import { Greet } from '@/components/Greet';
import { MainGoal } from '@/components/MainGoal';
import { QuoteDay } from '@/components/QuoteDay';
import { Weather } from '@/components/Weather';
import { Slider } from '@/components/Slider';
import { ToastContainer } from 'react-toastify';
import { TaskList } from '@/components/TaskList';
import { Calendar } from '@/components/Calendar';
import { PomodoroTechnique } from '@/components/Pomodoro';
import styles from './Screen.module.scss';

export const Screen = () => (
  <main className={styles.container}>
    <div className={styles.weatherContainer}>
      <div className={styles.actionButtons}>
        <TaskList />
        <Calendar />
        <PomodoroTechnique />
      </div>
      <Weather />
    </div>
    <div className={styles.mainContent}>
      <Clock />
      <Date />
      <Greet />
      <MainGoal />
      <QuoteDay />
    </div>
    <Slider />
    <ToastContainer />
  </main>
);
