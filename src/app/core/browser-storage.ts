import { InjectionToken } from '@angular/core';

// Storage is optional: private mode / browser policy must not break the demos.
export const BROWSER_STORAGE = new InjectionToken<Storage | null>('Browser storage', {
  providedIn: 'root',
  factory: () => {
    try {
      return globalThis.localStorage ?? null;
    } catch {
      return null;
    }
  },
});

export function readStored(storage: Storage | null, key: string): unknown {
  try {
    return JSON.parse(storage?.getItem(key) ?? 'null');
  } catch {
    return null;
  }
}
export function writeStored(storage: Storage | null, key: string, value: unknown): void {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    /* In-memory state remains usable. */
  }
}
