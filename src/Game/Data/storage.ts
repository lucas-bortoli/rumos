import { GameState } from "./state";

const STORAGE_KEY = "gameData";

function debounceFunction<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  } as T;
}

export function loadFromLocalStorage(initialIfNotFound: GameState) {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : initialIfNotFound;
  } catch (error) {
    console.error("Failed to load game data from localStorage", error);
    return initialIfNotFound;
  }
}

export function saveToLocalStorageImmediate(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save game data to localStorage", error);
  }
}

export const saveToLocalStorage = debounceFunction(saveToLocalStorageImmediate, 500);
