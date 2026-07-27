import { Stranger } from '../types';
import { INITIAL_STRANGERS } from '../data/strangers';

const CUSTOM_STRANGERS_KEY = 'guess_the_stranger_custom_strangers_v1';

export function loadStrangerPool(): Stranger[] {
  try {
    const raw = localStorage.getItem(CUSTOM_STRANGERS_KEY);
    if (raw) {
      const customStrangers: Stranger[] = JSON.parse(raw);
      if (Array.isArray(customStrangers) && customStrangers.length > 0) {
        const customIds = new Set(customStrangers.map((s) => s.id));
        const filteredInitial = INITIAL_STRANGERS.filter((s) => !customIds.has(s.id));
        return [...customStrangers, ...filteredInitial];
      }
    }
  } catch (e) {
    console.warn('Failed to load custom strangers from localStorage', e);
  }
  return INITIAL_STRANGERS;
}

export function saveCustomStrangers(pool: Stranger[]): void {
  try {
    const customOnly = pool.filter((s) => s.isCustom);
    localStorage.setItem(CUSTOM_STRANGERS_KEY, JSON.stringify(customOnly));
  } catch (e) {
    console.warn('Failed to save custom strangers to localStorage', e);
  }
}
