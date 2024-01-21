"use client";

import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import ConnectedWallet from "./ConnectedWallet";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";
const chains = [ sepolia];

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
    chains,
  })
);

const Wallet = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Wallet;
