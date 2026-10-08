import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const paths: Record<string, string> = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  layers: 'm12 3 10 5-10 5L2 8z M2 12l10 5 10-5 M2 16l10 5 10-5',
  form: 'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M9 8h6 M9 12h6 M9 16h4',
  branch: 'M6 3v12a4 4 0 0 0 4 4h8 M6 7h7a5 5 0 0 0 5-5 M3 3h6 M18 16v6',
  arrow: 'M5 19 19 5 M5 5h14v14',
  code: 'm8 7-5 5 5 5 m8-10 5 5-5 5 m-3-14-2 18',
  moon: 'M20 14a8 8 0 0 1-10-10 9 9 0 1 0 10 10Z',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 1v3 M12 20v3 M1 12h3 M20 12h3 M4 4l2 2 M18 18l2 2 M4 20l2-2 M18 6l2-2',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-8z',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M15 15l6 6',
  check: 'm5 12 4 4L19 6',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z',
};
@Component({
  selector: 'app-icon',
  template:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name()] || paths[\'code\']" /></svg>',
  styles:
    ':host{display:inline-flex;width:18px;height:18px;flex-shrink:0}svg{width:100%;height:100%}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input('code');
  protected readonly paths = paths;
}
