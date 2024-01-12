import '@/styles/globals.css'
import { WagmiConfig, createConfig } from 'wagmi';
import { polygonMumbai, avalancheFuji } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import Provider from '@/Provider';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  const config = createConfig(
    getDefaultConfig({
      appName: 'LFGHO hackathon',
      //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
      chains: [polygonMumbai, avalancheFuji],
      autoConnect: true,
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    })
  );

  useEffect(() => {
    const orig = window.console.error;
    window.console.error = function (...args) {
      if (args[0]?.name === "ChainDoesNotSupportContract") return;
      orig.apply(window.console, args);
    };
  }, []);


  return (
    <Provider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={config}>
        <ConnectKitProvider >
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </Provider>
  )
}
