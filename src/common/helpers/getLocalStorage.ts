import { MOMENTUM_APP } from '../constants';

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(MOMENTUM_APP);

  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData[key];
  }

  return null;
}
