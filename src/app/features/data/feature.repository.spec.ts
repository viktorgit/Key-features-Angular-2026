import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { activityInterceptor, HttpActivity } from '../../core/activity.interceptor';
import { FEATURE_DATA_URL, FeatureRepository } from './feature.repository';
import { Feature, FeatureQuery } from './feature.model';

describe('FeatureRepository and HTTP interceptor', () => {
  const query: FeatureQuery = {
    search: 'SIGNAL',
    category: 'Reactivity',
    fail: false,
    revision: 0,
  };
  const rows: Feature[] = [
    {
      id: 'signals',
      name: 'Signal state',
      description: 'Reactive state',
      category: 'Reactivity',
      api: 'signal',
      route: '/data',
    },
    {
      id: 'forms',
      name: 'Signal Forms',
      description: 'Forms',
      category: 'Experience',
      api: 'form',
      route: '/forms',
    },
  ];
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([activityInterceptor])),
        provideHttpClientTesting(),
        { provide: FEATURE_DATA_URL, useValue: 'fixtures/test.json' },
      ],
    }),
  );
  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('filters case-insensitively and honors the injected data source', () => {
    const activity = TestBed.inject(HttpActivity);
    let result: readonly Feature[] = [];
    TestBed.inject(FeatureRepository)
      .search(query)
      .subscribe((data) => (result = data));
    expect(activity.pending()).toBe(1);
    TestBed.inject(HttpTestingController).expectOne('fixtures/test.json').flush(rows);
    expect(result.map((row) => row.id)).toEqual(['signals']);
    expect(activity.pending()).toBe(0);
    expect(activity.completed()).toBe(1);
  });

  it('tracks failed requests and propagates errors', () => {
    const error = vi.fn();
    TestBed.inject(FeatureRepository).search(query).subscribe({ error });
    TestBed.inject(HttpTestingController)
      .expectOne('fixtures/test.json')
      .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    expect(error).toHaveBeenCalledOnce();
    expect(TestBed.inject(HttpActivity).pending()).toBe(0);
  });

  it('cancels an HTTP request when the consumer unsubscribes', () => {
    const subscription = TestBed.inject(FeatureRepository).search(query).subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne('fixtures/test.json');
    subscription.unsubscribe();
    expect(request.cancelled).toBe(true);
    expect(TestBed.inject(HttpActivity).pending()).toBe(0);
  });

  it('simulates errors without sending a real request', () => {
    const error = vi.fn();
    TestBed.inject(FeatureRepository)
      .search({ ...query, fail: true })
      .subscribe({ error });
    expect(error).toHaveBeenCalledOnce();
    TestBed.inject(HttpTestingController).expectNone('fixtures/test.json');
  });
});
