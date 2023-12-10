import { MOMENTUM_APP, TASK_LIST } from '@/common/constants';

export function getTasks() {
  const data = localStorage.getItem(MOMENTUM_APP);

  if (!data) {
    return [];
  }

  const parsedData = JSON.parse(data);
  const existedTask = parsedData?.[TASK_LIST];
  if (existedTask) {
    return existedTask;
  }

  return [];
}
