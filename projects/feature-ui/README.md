# feature-ui

A standalone contact-form library built with Angular 22 Signal Forms.

```ts
import { ContactForm, ContactRequest } from 'feature-ui';
```

Add ContactForm to a host component's imports:

```html
<lab-contact-form
  idPrefix="project-contact"
  submitLabel="Preview request"
  (submitted)="onRequest($event)"
/>
```

The output is a ContactRequest object with name, email and message strings. Invalid forms never emit. The component does not send HTTP requests, persist personal data or depend on the host application.

Name is required with a minimum of 2 characters. Email is required and validated. Message is required with a minimum of 10 characters. Use a unique idPrefix for each instance.

The component reads optional CSS tokens: --ink, --line, --surface, --muted and --purple. All have fallbacks.

Build with `npm run build:lib` from the workspace root. Test with `npm run ng -- test feature-ui --no-watch`.
