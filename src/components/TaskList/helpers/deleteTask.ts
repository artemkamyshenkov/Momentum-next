import { MOMENTUM_APP, TASK_LIST } from '@/common/constants';
import type { TaskItemType } from '../types';

export function deleteTask(id: string) {
  const data = localStorage.getItem(MOMENTUM_APP);

  if (data) {
    const parsedData = JSON.parse(data);
    const tasks: TaskItemType[] = parsedData[TASK_LIST];
    const filteredTasks = tasks?.filter(task => task.id !== id);
    localStorage.setItem(
      MOMENTUM_APP,
      JSON.stringify({ ...parsedData, [TASK_LIST]: filteredTasks }),
    );

    return filteredTasks;
  }
  return [];
}
