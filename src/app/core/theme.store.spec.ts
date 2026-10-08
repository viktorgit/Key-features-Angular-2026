import { TestBed } from '@angular/core/testing';
import { BROWSER_STORAGE } from './browser-storage';
import { ThemeStore } from './theme.store';
describe('ThemeStore', () => {
  it('applies the saved theme to the document and persists toggles', () => {
    localStorage.setItem('angular-lab:dark', 'true');
    TestBed.configureTestingModule({
      providers: [{ provide: BROWSER_STORAGE, useValue: localStorage }],
    });
    const store = TestBed.inject(ThemeStore);
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    store.toggle();
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('angular-lab:dark')).toBe('false');
  });
});
