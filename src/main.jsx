import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'

createRoot(document.getElementById('root')).render(
  <StylesProvider injectFirst>
    <CssBaseline />
    <App />
  </StylesProvider>,
)
