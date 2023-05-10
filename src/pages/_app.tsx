import '@/styles/globals.css';
import '@/styles/reset.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChakraProviders from '@/components/ChakraProviders';
import AuthUser from '@/components/Auth/AuthUser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        {process.env.NODE_ENV !== 'production' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        <ChakraProviders>
          {/*<AuthUser>*/}
          <Component {...pageProps} />
          {/*</AuthUser>*/}
        </ChakraProviders>
      </Hydrate>
    </QueryClientProvider>
  );
}
