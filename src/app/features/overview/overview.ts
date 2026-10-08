import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
@Component({
  imports: [RouterLink, Icon],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  protected readonly version = VERSION.full;
  protected readonly features = [
    {
      index: '01',
      icon: 'bolt',
      title: 'Signals & state',
      description:
        'Reactive by design. Derived state, immutable updates and a tiny store that stays in sync.',
      tags: ['signal()', 'computed()', 'effect()'],
      path: '/data',
      tone: 'purple',
    },
    {
      index: '02',
      icon: 'layers',
      title: 'RxJS & HTTP',
      description:
        'A searchable data flow with cancellation, error recovery and a functional interceptor.',
      tags: ['switchMap', 'toSignal()', 'HttpClient'],
      path: '/data',
      tone: 'blue',
    },
    {
      index: '03',
      icon: 'form',
      title: 'Forms & libraries',
      description: 'Signal Forms meet typed Reactive Forms. Reusable UI with a clear public API.',
      tags: ['Signal Forms', 'ng-packagr'],
      path: '/forms',
      tone: 'pink',
    },
    {
      index: '04',
      icon: 'branch',
      title: 'Dependency injection',
      description:
        'Explicit contracts, replaceable providers and isolated state through scoped services.',
      tags: ['inject()', 'InjectionToken'],
      path: '/architecture',
      tone: 'orange',
    },
    {
      index: '05',
      icon: 'grid',
      title: 'Lazy by default',
      description:
        'Load routes on demand. Bring a component into the page exactly when it is needed.',
      tags: ['loadComponent', '@defer'],
      path: '/architecture',
      tone: 'green',
    },
    {
      index: '06',
      icon: 'check',
      title: 'Quality built in',
      description:
        'Strict typing, behavioral tests and an automated build. Confidence with every change.',
      tags: ['Vitest', 'Playwright', 'CI'],
      path: '/architecture',
      tone: 'gray',
    },
  ];
}
