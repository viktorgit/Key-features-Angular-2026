# Key-features-Angular-2026

Интерактивное портфолио на **Angular 22.2.2**

[Открыть демо](https://viktorgit.github.io/Key-features-Angular-2026/) · [English README](README.md)

## Что внутри

- **Overview** — обзор подходов и переход к рабочим примерам.
- **Data & state** — signals-store, computed-состояние, RxJS, поиск с отменой запросов, HTTP interceptor, избранное с сохранением.
- **Forms & library** — Signal Forms в отдельно собираемой библиотеке `feature-ui`, типизированное событие формы и Typed Reactive Forms.
- **Architecture** — независимые экземпляры DI-сервиса, lazy routes и компонент, загружаемый через `@defer`.
- Standalone, zoneless, OnPush, новый control flow, адаптивная вёрстка и две темы.
- Vitest, Playwright, проверки доступности и GitHub Actions.

Интерфейс и основной README на английском, как в исходном портфолио.

## Запуск

Node.js 24.19.0 и npm:

```sh
npm ci
npm start
```

Приложение: [localhost:4200](http://localhost:4200). Библиотека соберётся автоматически.

## Проверки

```sh
npm test
npx playwright install chromium
npm run check
```

`npm run check` проверяет форматирование, запускает модульные тесты, собирает Pages-версию и проверяет её в браузере на desktop/mobile. Для уже установленного Chrome в PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'`.

## Публикация

После успешных проверок push в `main` запускает публикацию через GitHub Actions. В **Settings → Pages → Source** выбирается **GitHub Actions**.

Демо использует hash-routing, поэтому вложенные маршруты корректно открываются на GitHub Pages. Внешний backend, API-ключи и секреты не нужны. Формы ничего не отправляют; избранное и тема сохраняются только в браузере.
