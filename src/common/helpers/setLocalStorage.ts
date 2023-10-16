import { MOMENTUM_APP } from '../constants';

export function setLocalStorage(key: string, value: unknown) {
  const data = localStorage.getItem(MOMENTUM_APP);
  if (data && value) {
    const parsedData = JSON.parse(data);
    parsedData[key] = value;
    localStorage.setItem(MOMENTUM_APP, JSON.stringify(parsedData));
  }
  if (!data) {
    const newData: Record<string, unknown> = {};
    newData[key] = value;
    localStorage.setItem(MOMENTUM_APP, JSON.stringify(newData));
  }
}
