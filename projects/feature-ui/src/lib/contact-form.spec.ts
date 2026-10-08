import { TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
describe('ContactForm public contract', () => {
  async function setup() {
    const fixture = TestBed.createComponent(ContactForm);
    const emitted = vi.fn();
    fixture.componentInstance.submitted.subscribe(emitted);
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    const fill = async (selector: string, value: string) => {
      const input = root.querySelector<HTMLInputElement>(selector)!;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
    };
    const submit = async () => {
      root
        .querySelector('form')!
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await fixture.whenStable();
    };
    return { fixture, emitted, root, fill, submit };
  }
  it('shows validation errors and does not emit an invalid form', async () => {
    const { submit, root, emitted } = await setup();
    await submit();
    expect(emitted).not.toHaveBeenCalled();
    expect(root.textContent).toContain('Your name is required.');
    expect(root.textContent).toContain('Your email is required.');
  });
  it('validates email and emits a typed payload only after correction', async () => {
    const { fill, submit, emitted } = await setup();
    await fill('input[autocomplete=name]', 'Alex');
    await fill('input[type=email]', 'invalid');
    await fill('textarea', 'A reusable Angular workspace');
    await submit();
    expect(emitted).not.toHaveBeenCalled();
    await fill('input[type=email]', 'alex@example.com');
    await submit();
    expect(emitted).toHaveBeenCalledWith({
      name: 'Alex',
      email: 'alex@example.com',
      message: 'A reusable Angular workspace',
    });
  });
  it('resets model values and validation state', async () => {
    const { fixture, fill, root, submit } = await setup();
    await fill('input[autocomplete=name]', 'Alex');
    await submit();
    root.querySelector<HTMLButtonElement>('button[type=button]')!.click();
    await fixture.whenStable();
    expect(root.querySelector<HTMLInputElement>('input')!.value).toBe('');
    expect(root.querySelector('.errors')!.textContent).toBe('');
  });
});
