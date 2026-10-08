# Architecture notes

## From Angular 13 to Angular 22

| Original project                     | This implementation                                                   | Why                                                               |
| ------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| AppModule and feature NgModules      | Standalone bootstrap and components                                   | Dependencies are visible at the point of use                      |
| NGXS facade and form state           | Small signal-based favorites/theme stores; local form models          | Shared state stays small, while form ownership is explicit        |
| Observables and async pipe           | RxJS for time/cancellation; signals for template state                | Each abstraction handles the problem it fits                      |
| TABLE_DATA / TABLE_COLUMNS providers | FEATURE_DATA_URL and BROWSER_STORAGE tokens; scoped counter providers | Contracts and scopes can be replaced and tested                   |
| Angular Material theming             | CSS design tokens shared with the library                             | Demonstrates theming without coupling the example to a UI toolkit |
| Dynamic lazy module loading          | Router loadComponent plus an interaction-triggered @defer block       | Separate route and in-page loading boundaries                     |
| email-form Angular library           | Standalone feature-ui contact-form library                            | A compiled package with a typed public API                        |
| Karma/Jasmine                        | Angular CLI's Vitest runner; Playwright browser journeys              | Fast behavior tests plus production-build coverage                |

This is a rewrite in a separate repository. It does not alter the original project or claim feature-for-feature dependency compatibility.

## Boundaries

```text
src/app/
  core/                 browser storage, theme and HTTP activity
  shared/               icon and not-found UI
  features/
    overview/           feature discovery
    data/               repository, models, store, container and table
    forms/              library host + typed Reactive Forms
    architecture/       scoped DI and deferred component
projects/feature-ui/     separately built Angular package
public/data/            same-origin demonstration fixtures
e2e/                    browser journeys and automated accessibility checks
```

The table receives immutable data through signal inputs and emits user intent. It has no repository or storage dependency. The page coordinates queries; the repository handles HTTP and fixture filtering; the root store owns favorite IDs.

The data source is static. Filtering occurs in the repository after a real HTTP GET, not on a server. The outer switchMap cancels the previous debounce timer and HTTP subscription immediately on query changes. catchError is inside that switchMap so a failed request does not terminate future searches. toSignal owns subscription cleanup.

Storage is behind an InjectionToken. Reads validate persisted data; writes degrade to in-memory behavior if browser storage is denied or full. Form payloads are not persisted.

## Library

The app resolves `feature-ui` to `dist/feature-ui`, rather than importing its source internals. A library build therefore precedes application builds and tests. The component exports only its component class and ContactRequest type, with signal inputs and an output as its integration contract. All validation is internal.

The library uses CSS variables with fallbacks and no app imports. It can be built independently with `npm run build:lib`. For multiple form instances, provide a unique `idPrefix`.

## Rendering and deployment

This static portfolio intentionally uses client-side rendering. SSR, hydration, authentication and server-side validation are outside the demonstrated scope. Hash routing preserves deep links on GitHub Pages. The HTTP fixture URL is relative so it respects the project base path.

Every route uses loadComponent. DeferredInsights is referenced only within @defer, so Angular can generate a separate chunk. The E2E test observes an additional JavaScript request after interaction.

## Verification

- Unit tests cover persistence, malformed data, unavailable storage, DI scope, output events, HTTP filtering/error/cancellation and form validation/reset.
- Browser tests run against the actual production Pages artifact, including its nested base path.
- Desktop and mobile journeys cover theme persistence, search/filter/favorites, error recovery, form output and deferred loading.
- axe scans the rendered pages for WCAG 2 A/AA and 2.1 AA issues.
- CI gates deployment on formatting, unit tests, the production build and browser tests.

## References

- [Angular Signals](https://angular.dev/guide/signals)
- [RxJS interop](https://angular.dev/ecosystem/rxjs-interop)
- [Signal Forms](https://angular.dev/guide/forms/signals/overview)
- [Dependency injection](https://angular.dev/guide/di)
- [Deferred loading](https://angular.dev/guide/templates/defer)
- [Angular libraries](https://angular.dev/tools/libraries/creating-libraries)
- [Angular testing](https://angular.dev/guide/testing)
