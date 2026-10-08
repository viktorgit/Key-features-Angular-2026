import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  VERSION,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeStore } from './core/theme.store';
import { Icon } from './shared/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly version = VERSION.full;
  private readonly mainContent = viewChild.required<ElementRef<HTMLElement>>('mainContent');
  protected skipToContent(event: Event): void {
    event.preventDefault();
    this.mainContent().nativeElement.focus();
    this.mainContent().nativeElement.scrollIntoView();
  }
  protected readonly theme = inject(ThemeStore);
  protected readonly navigation = [
    { path: '/overview', name: 'Overview', icon: 'grid', number: '01' },
    { path: '/data', name: 'Data & state', icon: 'layers', number: '02' },
    { path: '/forms', name: 'Forms & library', icon: 'form', number: '03' },
    { path: '/architecture', name: 'Architecture', icon: 'branch', number: '04' },
  ];
}
