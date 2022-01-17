# @ttoss/ui

## 📚 About

<strong> @ttoss/ui</strong> is a easiest way to use Ui components in your React application.

## 🚀 Get Started

### Install @ttoss/ui

```shell
$ yarn add @ttoss/ui
# or
$ npm install @ttoss/ui
```

## 📄 Examples of use

```tsx
import { Flex, Text, Box, Button } from '@ttoss/ui';

const App = () => {
  return (
    <ThemeProvider>
      <Flex sx={{ flexDirection: 'column' }}>
        <Text>Text Value</Text>
        <Box>
          <Text>Text Value</Text>

          <Button>Button Primary</Button>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default App;
```

```tsx

```
