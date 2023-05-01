import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import customTheme from '@/styles/customTheme';
import theme from '@/styles/theme';

function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default ChakraProviders;
