import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScopedCounter } from './scoped-counter';
import { DeferredInsights } from './deferred-insights';
@Component({
  imports: [ScopedCounter, DeferredInsights],
  templateUrl: './architecture-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitecturePage {
  protected readonly diSnippet = `@Component({
  providers: [ScopedCounterStore],
})
export class ScopedCounter {
  readonly store = inject(ScopedCounterStore);
}
// Every component gets its own store.
// Root-provided stores share state across routes.`;
  protected readonly deferSnippet = `@defer (on interaction(loadButton)) {
  <app-deferred-insights />
} @placeholder {
  <p>The insights chunk is not loaded yet.</p>
} @loading (minimum 300ms) {
  <p>Loading insights…</p>
} @error {
  <p>Could not load. Refresh to retry.</p>
}`;
}
