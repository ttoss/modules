# @ttoss/i18n

## 📚 About

<strong> @ttoss/i18n</strong> is a easiest way to use translations in your React application.

## 🚀 Get Started

### Install @ttoss/i18n

```shell
$ yarn add @ttoss/i18n
# or
$ npm install @ttoss/i18n
```

## 📄 Examples of use

### Index.tsx

Import the I18nProvider and wrap your application with it. Add to it a function called `loadLocaleData` to load all the translation data.

```tsx title="src/index.tsx"
import { I18nProvider, LoadLocaleData } from '@ttoss/i18n';

const loadLocaleData: LoadLocaleData = (locale) => {
  switch (locale) {
    case 'pt-BR':
      return import('../i18n/compiled-lang/pt-BR.json');
    default:
      return import('../i18n/compiled-lang/en.json');
  }
};

ReactDOM.render(
  <I18nProvider
    locale={window.navigator.language}
    loadLocaleData={loadLocaleData}
  >
    <App />
  </I18nProvider>,
  document.getElementById('root')
);
```

### App.tsx

Then import the useI18n hook and extract the intl, to get access to the `formatMessage` function and many others (using `defineMessages` is optional).

```tsx title="src/App.tsx"
import { useI18n, defineMessages } from '@ttoss/i18n';

const messages = defineMessages({
  myNameIs: {
    description: 'My name is',
    defaultValue: 'My name is {name}',
  },
});

const App = () => {
  const { intl, setLocale } = useI18n();

  const [name, setName] = React.useState('Rayza');

  return (
    <div>
      <div>
        <button onClick={() => setLocale('en-US')}>en-US</button>

        <button onClick={() => setLocale('pt-BR')}>pt-BR</button>
      </div>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <h3>{intl.formatMessage(messages.myNameIs, { name })}</h3>
    </div>
  );
};

export default App;
```

## 📄 Extracted translations

### Commands to extract and compile

To extract the translations run the command `yarn i18n:extract`, and to compile use `yarn i18n:compile`

#### Extract

```shell
yarn i18n:extract
```

#### Compile

```shell
yarn i18n:compile
```

```json title="i18n/compiled-lang/en-US.json"
{
  "IDLw9V": {
    "defaultMessage": "My name is {name}.",
    "description": "My name is"
  },
  "tPkQ38": {
    "defaultMessage": "Congrats",
    "description": "Congrats"
  }
}
```

```json title="i18n/compiled-lang/pt-BR.json"
{
  "IDLw9V": {
    "defaultMessage": "Meu nome é {name}.",
    "description": "My name is"
  },
  "tPkQ38": {
    "defaultMessage": "Parabéns",
    "description": "Congrats"
  }
}
```

## 📘 Types

```ts
import { MessageFormatElement } from 'react-intl';

export type MessageType = any;

export type LoadLocaleData = (locale: string) => Promise<MessagesType>;

export type I18nProviderProps = {
  locale?: string;
  loadLocaleData?: LoadLocaleData;
};
```
