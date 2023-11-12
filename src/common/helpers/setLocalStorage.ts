import { MOMENTUM_APP } from '../constants';

export function setLocalStorage<T>(key: string, value: T) {
  const data = localStorage.getItem(MOMENTUM_APP);
  if (data) {
    const parsedData = JSON.parse(data);
    parsedData[key] = value;
    localStorage.setItem(MOMENTUM_APP, JSON.stringify(parsedData));
  }
  if (!data) {
    const newData: Record<string, T> = {};
    newData[key] = value;
    localStorage.setItem(MOMENTUM_APP, JSON.stringify(newData));
  }
}
