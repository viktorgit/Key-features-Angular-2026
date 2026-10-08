import { TestBed } from '@angular/core/testing';
import { BROWSER_STORAGE } from '../../core/browser-storage';
import { FavoritesStore } from './favorites.store';

describe('FavoritesStore', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: BROWSER_STORAGE, useValue: localStorage }],
    });
  });

  it('toggles favorites without duplicates and derives the count', () => {
    const store = TestBed.inject(FavoritesStore);
    store.toggle('signals');
    store.toggle('rxjs');
    expect(store.count()).toBe(2);
    store.toggle('signals');
    expect(store.ids()).toEqual(['rxjs']);
    store.clear();
    expect(store.count()).toBe(0);
  });

  it('restores validated data and persists changes', () => {
    localStorage.setItem('angular-lab:favorites', '["signals","signals",42]');
    const store = TestBed.inject(FavoritesStore);
    expect(store.ids()).toEqual(['signals']);
    store.toggle('rxjs');
    TestBed.tick();
    expect(JSON.parse(localStorage.getItem('angular-lab:favorites')!)).toEqual(['signals', 'rxjs']);
  });

  it('recovers from corrupt saved data', () => {
    localStorage.setItem('angular-lab:favorites', '{not json');
    expect(TestBed.inject(FavoritesStore).ids()).toEqual([]);
  });

  it('works when browser storage is unavailable', () => {
    TestBed.overrideProvider(BROWSER_STORAGE, { useValue: null });
    const store = TestBed.inject(FavoritesStore);
    store.toggle('signals');
    TestBed.tick();
    expect(store.count()).toBe(1);
  });
});
