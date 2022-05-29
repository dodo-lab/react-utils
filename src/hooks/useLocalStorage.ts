import {useCallback, useState} from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((value: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        setStoredValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue] as const;
};
