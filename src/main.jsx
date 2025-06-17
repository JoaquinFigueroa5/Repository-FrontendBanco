import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import UserProvider from './context/UserProvider.jsx';
import theme from './shared/assets/theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider theme={theme} >
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </BrowserRouter>
);
