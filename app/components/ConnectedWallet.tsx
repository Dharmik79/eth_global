import { useAccount } from "wagmi";
import Transfer from "./Transfer";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

// Make sure that this component is wrapped with ConnectKitProvider
const ConnectedWallet = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <>
        
    <Transfer address={address || ""}/>
      <div>Connected Wallet: {address}</div>
    </>
  );
};

export default ConnectedWallet;
