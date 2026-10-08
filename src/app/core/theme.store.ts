import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { BROWSER_STORAGE, readStored, writeStored } from './browser-storage';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly storage = inject(BROWSER_STORAGE);
  private readonly document = inject(DOCUMENT);
  private readonly state = signal(readStored(this.storage, 'angular-lab:dark') === true);
  readonly dark = this.state.asReadonly();

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.dark() ? 'dark' : 'light';
      writeStored(this.storage, 'angular-lab:dark', this.dark());
    });
  }
  toggle(): void {
    this.state.update((value) => !value);
  }
}
