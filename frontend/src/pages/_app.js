import '@/styles/globals.css'
import { WagmiConfig, createConfig } from 'wagmi';
import { polygonMumbai, avalancheFuji } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import Provider from '@/Provider';

export default function App({ Component, pageProps }) {

  const config = createConfig(
    getDefaultConfig({
      appName: 'ConnectKit Next.js demo',
      //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
      chains: [polygonMumbai, avalancheFuji],
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    })
  );


  return (
    <Provider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={config}>
        <ConnectKitProvider debugMode>
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </Provider>
  )
}
