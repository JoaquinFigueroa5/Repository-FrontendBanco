import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './context/UseContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </BrowserRouter>
)
