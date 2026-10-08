import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactForm, ContactRequest } from 'feature-ui';

@Component({
  imports: [ContactForm, ReactiveFormsModule, JsonPipe],
  templateUrl: './forms-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPage {
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly preview = signal<ContactRequest | null>(null);
  protected readonly preferences = this.fb.group({
    displayName: ['Viktor', [Validators.required, Validators.minLength(2)]],
    updates: [true],
    experience: ['Advanced'],
  });
  protected readonly savedPreferences = signal<ReturnType<
    typeof this.preferences.getRawValue
  > | null>(null);
  protected readonly snippet = `// Public API of the standalone feature-ui library
readonly submitted = output<ContactRequest>();
readonly model = signal({ name: '', email: '', message: '' });

readonly fields = form(this.model, path => {
  required(path.name);
  email(path.email);
  minLength(path.message, 10);
});

// Template
<input [formField]="fields.email" />
// The library emits data. The host decides what happens next.`;
  protected savePreferences(): void {
    this.preferences.markAllAsTouched();
    if (this.preferences.valid) this.savedPreferences.set(this.preferences.getRawValue());
  }
}
