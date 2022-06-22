import {CssBaseline, ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import React, { ReactElement, ReactNode } from 'react'
import Mytheme from '../styles/customThemes'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <React.StrictMode>
      <ThemeProvider theme={Mytheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
        {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
