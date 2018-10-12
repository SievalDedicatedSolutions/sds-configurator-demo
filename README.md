# SdsConfiguratorDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Configuration

In the `src/config.ts` file, enter you configuration:

```javascript
export const config = {
  apiKey: 'aaaaa-bbb-aaa',
  baseUrl: 'https://test.url.com',
  emailAddress: 'test@test.com',
  password: 'Password123'
};
```

In the `configurator-page.component.html` file, enter the api-key:

```html
<sds-configurator #configurator
                  api-key="aaaaa-bbb-aaa">
</sds-configurator>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
