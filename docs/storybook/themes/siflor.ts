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
  radii: {
    none: 0,
    partial: 6,
    full: '100%',
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

  borderWidths: [0, '1px'],
  colors: {
    transparent: '#ffffff00',
    primary: '#127547',
    secondary: '#457F8D',
    text: '#393A3A',
    background: '#F7F9F8',
    accent: '#00C7FE',
    highlight: '#0067D2',
    muted: '#B9B9B9',
    primaryVariant: '#008774',
    secondaryVariant: '#7AB4C3',
    alert: '#FF655B',
    success: '#66AA00',
    caution: '#FC6C00',
    neutral: '#888888',
    eucalipto: '#E79E49',
    pinus: '#EBC36D',
    cedroAustraliano: '#9F4F2A',
    mognoAfricano: '#C18771',
    teca: '#C19358',
  },
  shadows: ['0', '0px 4px 4px rgba(0, 0, 0, 0.15)'],
  sizes: { container: '68em' },
  zIndices: [0, 10, 100, 1000],
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
    },
  },
};
