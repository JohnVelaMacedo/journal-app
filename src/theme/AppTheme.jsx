import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { purpleTheme } from './purpleTheme'

function AppTheme({ children }) {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  )
}

export default AppTheme
