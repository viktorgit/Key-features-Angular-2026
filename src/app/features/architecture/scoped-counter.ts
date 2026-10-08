import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
  input,
  signal,
} from '@angular/core';
@Injectable()
export class ScopedCounterStore {
  private readonly value = signal(0);
  readonly count = this.value.asReadonly();
  increment(): void {
    this.value.update((n) => n + 1);
  }
  reset(): void {
    this.value.set(0);
  }
}
@Component({
  selector: 'app-scoped-counter',
  providers: [ScopedCounterStore],
  template: `<section class="counter">
    <span class="eyebrow">{{ label() }}</span>
    <div class="metric-value" aria-live="polite">{{ store.count() }}</div>
    <div class="inline-actions">
      <button
        class="button small"
        (click)="store.increment()"
        [attr.aria-label]="'Increment ' + label()"
      >
        Add one +</button
      ><button
        class="button small subtle"
        (click)="store.reset()"
        [attr.aria-label]="'Reset ' + label()"
      >
        Reset
      </button>
    </div>
  </section>`,
  styles:
    '.counter{padding:20px;background:var(--bg);border:1px solid var(--line);border-radius:9px}.metric-value{margin:15px 0}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScopedCounter {
  readonly label = input.required<string>();
  protected readonly store = inject(ScopedCounterStore);
}
