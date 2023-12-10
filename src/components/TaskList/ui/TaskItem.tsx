import React from 'react';
import Close from '@/common/icons/close.svg';
import type { TaskItemType } from '../types';
import styles from './TaskItem.module.scss';

interface TaskItemProps {
  task: TaskItemType;
  onDelete: (id: string) => void;
  sequence: number;
}
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  sequence,
}) => (
  <div className={styles.task}>
    <div>
      <span className={styles.sequence}>{sequence ?? ''}.</span>
      <span>{task?.title ?? ''}</span>
    </div>
    <button
      type="button"
      className={styles.deleteBtn}
      onClick={() => onDelete(task.id)}
    >
      <Close />
    </button>
  </div>
);
