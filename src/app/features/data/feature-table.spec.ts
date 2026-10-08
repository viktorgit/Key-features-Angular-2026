import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeatureTable } from './feature-table';
describe('FeatureTable', () => {
  it('emits user intent without mutating the supplied favorites', async () => {
    TestBed.configureTestingModule({ imports: [FeatureTable], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(FeatureTable);
    fixture.componentRef.setInput('rows', [
      {
        id: 'signals',
        name: 'Signals',
        description: 'State',
        category: 'Reactivity',
        api: 'signal',
        route: '/data',
      },
    ]);
    fixture.componentRef.setInput('favorites', []);
    const emitted = vi.fn();
    fixture.componentInstance.toggleFavorite.subscribe(emitted);
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitted).toHaveBeenCalledWith('signals');
    expect(fixture.componentInstance.favorites()).toEqual([]);
    fixture.componentRef.setInput('favorites', ['signals']);
    await fixture.whenStable();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});
