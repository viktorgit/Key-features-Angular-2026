import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
@Component({
  selector: 'app-deferred-insights',
  template: `<div class="insights">
    <span class="eyebrow">DEFERRED COMPONENT IS NOW LOADED</span>
    <h3>Only pay for what you open.</h3>
    <p>
      This component has its own JavaScript chunk. The chart below is an illustrative bundle model,
      not a measured benchmark.
    </p>
    <label for="initial-size">Initial bundle: {{ initial() }} KB</label
    ><input
      id="initial-size"
      type="range"
      min="50"
      max="250"
      step="10"
      [value]="initial()"
      #slider
      (input)="initial.set(+slider.value)"
    />
    <div class="bar" role="img" [attr.aria-label]="'Initial ' + initial() + ' KB, deferred 80 KB'">
      <span [style.width.%]="initialPercent()"></span>
    </div>
    <div class="legend">
      <span>● Initial {{ initial() }} KB</span><span>○ Deferred 80 KB</span
      ><strong>Total {{ total() }} KB</strong>
    </div>
  </div>`,
  styles:
    '.insights{padding:24px;border-radius:9px;background:var(--purple-soft)}h3{margin-top:15px}p{font-size:12px;color:var(--muted)}label{display:block;margin:20px 0 8px}input{width:100%;accent-color:var(--purple)}.bar{height:28px;border-radius:6px;background:var(--lavender);overflow:hidden;margin-top:15px}.bar span{display:block;height:100%;background:var(--purple)}.legend{display:flex;gap:14px;flex-wrap:wrap;font-size:10px;margin-top:12px}.legend strong{margin-left:auto}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferredInsights {
  protected readonly initial = signal(140);
  protected readonly total = computed(() => this.initial() + 80);
  protected readonly initialPercent = computed(() => (this.initial() / this.total()) * 100);
}
