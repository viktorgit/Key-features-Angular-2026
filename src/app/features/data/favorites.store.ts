import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { BROWSER_STORAGE, readStored, writeStored } from '../../core/browser-storage';

@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly storage = inject(BROWSER_STORAGE);
  private readonly saved = readStored(this.storage, 'angular-lab:favorites');
  private readonly state = signal<readonly string[]>(
    Array.isArray(this.saved)
      ? [...new Set(this.saved.filter((id): id is string => typeof id === 'string'))]
      : [],
  );
  readonly ids = this.state.asReadonly();
  readonly count = computed(() => this.ids().length);

  constructor() {
    effect(() => writeStored(this.storage, 'angular-lab:favorites', this.ids()));
  }
  toggle(id: string): void {
    this.state.update((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );
  }
  clear(): void {
    this.state.set([]);
  }
}
