import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScopedCounter } from './scoped-counter';
@Component({
  imports: [ScopedCounter],
  template: '<app-scoped-counter label="A" /><app-scoped-counter label="B" />',
})
class Host {}
describe('Scoped DI', () => {
  it('isolates state between two instances', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const counters: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('app-scoped-counter');
    counters[0].querySelector('button')!.click();
    await fixture.whenStable();
    expect(counters[0].querySelector('.metric-value')!.textContent).toBe('1');
    expect(counters[1].querySelector('.metric-value')!.textContent).toBe('0');
  });
});
