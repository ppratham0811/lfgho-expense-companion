import Web3ContextProvider from "@/Context/Web3Context";
import Provider from "@/Provider";
import "@/styles/globals.css";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { useEffect } from "react";
import { WagmiConfig, createConfig } from "wagmi";
import { arbitrumSepolia, sepolia } from "wagmi/chains";

export default function App({ Component, pageProps }) {
  const config = createConfig(
    getDefaultConfig({
      appName: "LFGHO hackathon",
      //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
      chains: [sepolia],
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
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={config}>
        <Web3ContextProvider>
          <ConnectKitProvider>
            <Component {...pageProps} />
          </ConnectKitProvider>
        </Web3ContextProvider>
      </WagmiConfig>
    </Provider>
  );
}
