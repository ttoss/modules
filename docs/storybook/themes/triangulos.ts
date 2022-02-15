import type { Theme } from '@ttoss/ui';

export const theme: Theme = {
  breakpoints: ['42em', '60em'],
  space: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987],
  fonts: {
    body: 'Overlock',
    heading: 'Josefin Sans',
  },
  fontSizes: [7, 10, 12, 17, 22, 29, 39, 51, 68, 90],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  buttons: {
    primary: {
      paddingX: 7,
      paddingY: 6,
      fontFamily: 'body',
      fontSize: 3,
    },
  },

  links: {
    styles: {
      a: {
        fontFamily: 'body',
        fontSize: 3,
        color: 'text',
        textDecoration: 'none',
      },
    },
  },

  cards: {
    primary: {
      fontFamily: 'body',
      padding: 7,
      paddingTop: 8,
      border: 'none',
      background: 'white',
    },
  },

  forms: {
    input: {
      borderColor: 'muted',
      borderWidth: 2,
      fontFamily: 'body',
      fontSize: 3,
      paddingY: 4,
      paddingX: 5,
      '::placeholder': {
        color: 'muted',
      },
    },
  },
};
