import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: 'overview',
    title: 'Overview · Angular Lab',
    loadComponent: () => import('./features/overview/overview').then((m) => m.Overview),
  },
  {
    path: 'data',
    title: 'Data & state · Angular Lab',
    loadComponent: () => import('./features/data/data-page').then((m) => m.DataPage),
  },
  {
    path: 'forms',
    title: 'Forms & library · Angular Lab',
    loadComponent: () => import('./features/forms/forms-page').then((m) => m.FormsPage),
  },
  {
    path: 'architecture',
    title: 'Architecture · Angular Lab',
    loadComponent: () =>
      import('./features/architecture/architecture-page').then((m) => m.ArchitecturePage),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found').then((m) => m.NotFound),
    title: 'Page not found · Angular Lab',
  },
];
