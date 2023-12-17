'use client';

import { Drawer } from '@/common/ui';
import type { ChangeEvent, KeyboardEvent } from 'react';
import React, { useEffect, useState } from 'react';
import TasksIcon from '@/common/icons/tasks.svg';
import Plus from '@/common/icons/plus.svg';
import Clear from '@/common/icons/clear.svg';
import styles from './TaskList.module.scss';
import { createTask } from '../helpers/createTask';
import { getTasks } from '../helpers/getTasks';
import { TaskItem } from './TaskItem';
import type { TaskItemType } from '../types';
import { deleteTask } from '../helpers/deleteTask';

export const TaskList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useState<TaskItemType[]>([]);

  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
  };

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e?.target?.value);
  };

  const getAllTasks = () => {
    const tasks = getTasks();
    setTaskList(tasks);
  };

  const handleSubmit = () => {
    createTask({ title: String(inputValue), id: String(Date.now()) });
    setInputValue('');
    getAllTasks();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue?.length > 0) {
      handleSubmit();
    }
  };

  const handleClear = () => {
    if (inputValue) {
      setInputValue('');
    }
  };

  const handleDeleteTask = (id: string) => {
    const newTasks = deleteTask(id);
    setTaskList(newTasks);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        title="Текущие задачи"
      >
        <div className={styles.addContainer}>
          <button type="button" className={styles.addBtn}>
            <Plus />
          </button>
          <div className={styles.inputContainer}>
            <input
              placeholder="Добавить задачу"
              className={styles.addInput}
              maxLength={150}
              autoComplete="off"
              value={inputValue}
              onChange={handleInputValueChange}
              onKeyDown={handleKeyPress}
              type="search"
            />
            {inputValue && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleClear}
              >
                <Clear />
              </button>
            )}
          </div>
        </div>
        {taskList.length > 0 && (
          <ul>
            {taskList.map((task, idx) => (
              <TaskItem
                task={task}
                key={task.id}
                onDelete={handleDeleteTask}
                sequence={idx + 1}
              />
            ))}
          </ul>
        )}
      </Drawer>
      <button
        type="button"
        className={styles.taskListOpenBtn}
        onClick={handleDrawerToggle}
      >
        <TasksIcon />
      </button>
    </>
  );
};
