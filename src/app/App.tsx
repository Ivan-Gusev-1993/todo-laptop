import './App.css'
import {Main} from '@/app/Main'
import {Header} from '@/common/components/Header/Header'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {getTheme} from '@/common/theme/theme'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'
import {selectThemeMode} from './app-selectors'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
      <ThemeProvider theme={theme}>
        <div className={'app'}>
          <CssBaseline />
          <Header/>
          <Main/>
        </div>
      </ThemeProvider>
  )
}
