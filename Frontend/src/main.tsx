import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import theme from './theme'
import {PlayerProvider} from './context/player-context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
)
