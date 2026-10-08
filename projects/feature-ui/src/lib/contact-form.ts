import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}
const emptyRequest = (): ContactRequest => ({ name: '', email: '', message: '' });

@Component({
  selector: 'lab-contact-form',
  imports: [FormField],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  readonly idPrefix = input('contact');
  readonly submitLabel = input('Preview request');
  readonly submitted = output<ContactRequest>();
  protected readonly model = signal<ContactRequest>(emptyRequest());
  protected readonly fields = form(this.model, (path) => {
    required(path.name, { message: 'Your name is required.' });
    minLength(path.name, 2, { message: 'Use at least 2 characters.' });
    required(path.email, { message: 'Your email is required.' });
    email(path.email, { message: 'Enter a valid email address.' });
    required(path.message, { message: 'Add a short message.' });
    minLength(path.message, 10, { message: 'Use at least 10 characters.' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    void submit(this.fields, async () => {
      this.submitted.emit({ ...this.model() });
    });
  }
  protected reset(): void {
    this.fields().reset(emptyRequest());
  }
}
