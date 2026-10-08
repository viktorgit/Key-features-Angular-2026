import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { FavoritesStore } from './favorites.store';
import { FeatureRepository } from './feature.repository';
import { FeatureResult } from './feature.model';
import { FeatureTable } from './feature-table';
import { HttpActivity } from '../../core/activity.interceptor';
import { Icon } from '../../shared/icon';

const loading: FeatureResult = { status: 'loading', data: [], message: '' };

@Component({
  imports: [FeatureTable, Icon],
  templateUrl: './data-page.html',
  styleUrl: './data-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPage {
  protected readonly favorites = inject(FavoritesStore);
  protected readonly activity = inject(HttpActivity);
  private readonly repository = inject(FeatureRepository);
  protected readonly search = signal('');
  protected readonly category = signal('All');
  protected readonly savedOnly = signal(false);
  private readonly fail = signal(false);
  private readonly revision = signal(0);
  private readonly query = computed(() => ({
    search: this.search(),
    category: this.category(),
    fail: this.fail(),
    revision: this.revision(),
  }));
  // The outer switchMap cancels immediately, including the debounce timer and any in-flight HTTP.
  protected readonly result = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) =>
        timer(250).pipe(
          switchMap(() => this.repository.search(query)),
          map((data) => ({ status: 'ready', data, message: '' }) as FeatureResult),
          catchError(() =>
            of<FeatureResult>({
              status: 'error',
              data: [],
              message: 'Could not load features. Retry to recover.',
            }),
          ),
          startWith(loading),
        ),
      ),
    ),
    { initialValue: loading },
  );
  protected readonly visible = computed(() =>
    this.result().data.filter((row) => !this.savedOnly() || this.favorites.ids().includes(row.id)),
  );
  protected readonly snippet = `query = computed(() => ({ search: search(), category: category() }));

result = toSignal(toObservable(query).pipe(
  switchMap(query => timer(250).pipe(
    switchMap(() => repository.search(query)),
    map(data => ({ status: 'ready', data })),
    catchError(() => of(errorState)),
    startWith(loadingState),
  )),
));`;
  protected toggleSavedOnly(): void {
    this.savedOnly.update((value) => !value);
  }
  protected simulateError(): void {
    this.fail.set(true);
    this.revision.update((n) => n + 1);
  }
  protected reload(): void {
    this.fail.set(false);
    this.revision.update((n) => n + 1);
  }
}
