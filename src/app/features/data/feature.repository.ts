import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Feature, FeatureQuery } from './feature.model';

// Relative URL deliberately respects the /Key-features-Angular-2026/ Pages base path.
export const FEATURE_DATA_URL = new InjectionToken<string>('Feature data URL', {
  providedIn: 'root',
  factory: () => 'data/features.json',
});
@Injectable({ providedIn: 'root' })
export class FeatureRepository {
  private readonly http = inject(HttpClient);
  private readonly url = inject(FEATURE_DATA_URL);

  search(query: FeatureQuery): Observable<readonly Feature[]> {
    if (query.fail)
      return throwError(() => new Error('A simulated request failed. Retry to recover.'));
    const term = query.search.trim().toLowerCase();
    return this.http
      .get<Feature[]>(this.url)
      .pipe(
        map((rows) =>
          rows.filter(
            (row) =>
              (query.category === 'All' || row.category === query.category) &&
              (row.name + ' ' + row.description + ' ' + row.api).toLowerCase().includes(term),
          ),
        ),
      );
  }
}
