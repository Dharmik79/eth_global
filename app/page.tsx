"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import ConnectedWallet from "./components/ConnectedWallet";
import { mainnet, polygon, optimism, arbitrum ,sepolia} from "wagmi/chains";
const chains = [mainnet, polygon, optimism, arbitrum,sepolia];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  chains
  }),
);

const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
      <ConnectKitButton />
       <ConnectedWallet />
    
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;

