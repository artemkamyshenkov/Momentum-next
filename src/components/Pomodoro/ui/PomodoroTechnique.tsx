'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PomodoroIcon from '@/common/icons/pomodoro.svg';
import PlayIcon from '@/common/icons/play.svg';
import PauseIcon from '@/common/icons/pause.svg';
import { Drawer } from '@/common/ui';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Pomodoro.module.scss';

type ModeTypes = 'work' | 'break' | null;

const sliderStyle = {
  trackStyle: { backgroundColor: '#38858a' },
  handleStyle: {
    borderColor: '#38858a',
    backgroundColor: '#38858a',
    opacity: 1,
  },
};

// FIXME: Refactor
export const PomodoroTechnique = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState<ModeTypes>('work');
  const [workDuration, setWorkDuration] = useState<number | number[]>(45);
  const [breakDuration, setBreakDuration] = useState<number | number[]>(15);

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
  };

  const initTimer = useCallback(() => {
    setSecondsLeft(Number(workDuration) * 60);
  }, [workDuration]);

  const switchMode = useCallback(() => {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSecondsLeft =
      (nextMode === 'work' ? Number(workDuration) : Number(breakDuration)) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSecondsLeft);
    secondsLeftRef.current = nextSecondsLeft;
  }, [workDuration, breakDuration]);

  const tickTimer = () => {
    secondsLeftRef.current -= 1;
    setSecondsLeft(secondsLeftRef.current);
  };

  useEffect(() => {
    initTimer();

    secondsLeftRef.current = Number(workDuration) * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return undefined;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tickTimer();
      return undefined;
    }, 1000);

    return () => clearInterval(interval);
  }, [initTimer, switchMode, workDuration]);

  const totalSeconds =
    (mode === 'work' ? Number(workDuration) : Number(breakDuration)) * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <>
      <button
        type="button"
        className={styles.openBtn}
        onClick={handleDrawerToggle}
        title="Pomodoro"
      >
        <PomodoroIcon />
      </button>
      {drawerOpen && (
        <Drawer open={drawerOpen} onClose={handleDrawerToggle} title="Pomodoro">
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              textColor: '#38858A',
              pathColor: mode === 'work' ? '#38858A' : '#4aec8c',
              trailColor: 'rgba(255, 255, 255, 0.2)',
            })}
          >
            <p className={styles.progressMode}>
              {isPaused ? 'Пауза' : `${mode === 'work' ? 'Работа' : 'Отдых'}`}
            </p>
            <p className={styles.progressTime}>{`${minutes}:${String(
              seconds,
            ).padStart(2, '0')}`}</p>

            {isPaused ? (
              <button
                type="button"
                onClick={() => {
                  setIsPaused(false);
                  isPausedRef.current = false;
                }}
                className={styles.actionBtn}
              >
                <PlayIcon />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsPaused(true);
                  isPausedRef.current = true;
                }}
                className={styles.actionBtn}
              >
                <PauseIcon />
              </button>
            )}
          </CircularProgressbarWithChildren>

          <div className={styles.settings}>
            <h4 className={styles.settingsTitle}>Настройки:</h4>
            <p>Работа: {workDuration} мин.</p>
            <Slider
              min={1}
              max={120}
              onChange={val => {
                setWorkDuration(val);
              }}
              value={workDuration}
              trackStyle={sliderStyle.trackStyle}
              handleStyle={sliderStyle.handleStyle}
            />
            <p>Отдых: {breakDuration} мин.</p>
            <Slider
              min={1}
              max={30}
              onChange={val => {
                setBreakDuration(val);
              }}
              value={breakDuration}
              trackStyle={sliderStyle.trackStyle}
              handleStyle={sliderStyle.handleStyle}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};
