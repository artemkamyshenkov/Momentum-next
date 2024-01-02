'use client';

import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import CalendarIcon from '@/common/icons/calendar.svg';
import styles from './Calendar.module.scss';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setCalendarOpen(prev => !prev);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleCalendarToggle}
        className={styles.openBtn}
      >
        <CalendarIcon />
      </button>
      {calendarOpen && (
        <div>
          <ReactCalendar onChange={onChange} value={value} />
        </div>
      )}
    </>
  );
};
