import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpActivity {
  private readonly pendingState = signal(0);
  private readonly completedState = signal(0);
  readonly pending = this.pendingState.asReadonly();
  readonly completed = this.completedState.asReadonly();
  start(): void {
    this.pendingState.update((n) => n + 1);
  }
  finish(): void {
    this.pendingState.update((n) => n - 1);
    this.completedState.update((n) => n + 1);
  }
}

export const activityInterceptor: HttpInterceptorFn = (request, next) => {
  const activity = inject(HttpActivity);
  activity.start();
  return next(request).pipe(finalize(() => activity.finish()));
};
