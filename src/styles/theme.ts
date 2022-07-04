import { extendTheme, Theme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      900: "#181823",
      800: '#1f2029',
      700: '#353646',
      600: '#4B4D63',
      500: '#616480',
      400: '#797D9A',
      300: '#9699B0',
      200: '#b3b5c6',
      100: '#d1d2dc',
      50: '#eeeef2',
    }
  },
  fonts: {
    headiong: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
} as Theme | {})