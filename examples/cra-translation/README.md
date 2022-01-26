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

```tsx title="src/index.tsx"
import { Provider } from '@ttoss/i18n';

const translations = {
  'en-US': {
    hello: 'Hello!',
    congratulations: 'Congratulations',
    welcome: 'Welcome {name}',
  },
  'pt-BR': {
    hello: 'Olá!',
    congratulations: 'Parabéns',
    welcome: 'Seja Bem vindo {name}',
  },
};

ReactDOM.render(
  <Provider initialLocale="en-US" translations={translations}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

```tsx title="src/App.tsx"
import { useTranslation, useIntl } from '@ttoss/i18n';

const App = () => {
  const { formatMessage } = useIntl();
  const { changeLanguage } = useTranslation();

  const [name, setName] = React.useState('Rayza');

  return (
    <div>
      <div>
        <button onClick={() => changeLanguage('en-US')}>en-US</button>

        <button onClick={() => changeLanguage('pt-BR')}>pt-BR</button>
      </div>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <h3>{formatMessage({ id: 'welcome' }, { name })}</h3>
    </div>
  );
};

export default App;
```

## 📘 Types

```ts
import { MessageFormatElement } from 'react-intl';

export type MessageType =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

export type AvailableLanguages = {
  [key: string]: MessageType;
};

export type ProviderProps = {
  initialLocale: string;
  translations: AvailableLanguages;
};

export type useTranslation = {
  availableLanguages?: AvailableLanguages;
  locale: string;
  selectedLanguage?: MessageType | undefined;
  changeLanguage: (language: string) => void;
  setInitialLanguages: (languages: AvailableLanguages) => void;
};
```
