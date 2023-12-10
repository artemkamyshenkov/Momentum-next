import { MOMENTUM_APP, TASK_LIST } from '@/common/constants';
import type { TaskItemType } from '../types';

export function createTask(task: TaskItemType) {
  const data = localStorage.getItem(MOMENTUM_APP);

  if (data) {
    const newTasks = [];
    const parsedData = JSON.parse(data);
    const existedTask = parsedData?.[TASK_LIST];
    if (existedTask) {
      newTasks.push(...existedTask, task);
    } else {
      newTasks.push(task);
    }
    localStorage.setItem(
      MOMENTUM_APP,
      JSON.stringify({ ...parsedData, [TASK_LIST]: newTasks }),
    );
    return newTasks;
  }
  const newData: Record<string, TaskItemType[]> = {};
  newData[TASK_LIST] = [task];
  localStorage.setItem(MOMENTUM_APP, JSON.stringify(newData));
  return newData;
}
