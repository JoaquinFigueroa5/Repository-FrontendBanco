// theme.js
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
    initialColorMode: 'dark',  // 🌙 Tema por defecto
    useSystemColorMode: false, // Ignora el modo del sistema
};

const theme = extendTheme({
    config,
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.50', 'gray.900')(props),
                color: mode('gray.800', 'whiteAlpha.900')(props),
            },
        }),
    },
});

export default theme;
