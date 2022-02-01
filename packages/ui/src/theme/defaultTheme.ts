import { Theme } from '@theme-ui/core';

export const defaultTheme: Theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#639',
    gray: '#555',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  styles: {
    a: {
      color: 'primary',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  buttons: {
    primary: {
      color: 'white',
      backgroundColor: 'primary',
    },
    secondary: {
      color: 'white',
      backgroundColor: 'secondary',
    },
  },
  cards: {
    primary: {
      backgroundColor: 'background',
      border: '1px solid black',
      padding: [4, 5],
    },
  },
  text: {
    title: {
      fontSize: [4, 5],
      textAlign: 'center',
    },
  },
};
