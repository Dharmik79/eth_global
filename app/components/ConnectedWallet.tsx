import { useAccount } from "wagmi";
import Transfer from "./Transfer";

// Make sure that this component is wrapped with ConnectKitProvider
const ConnectedWallet = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (<><div>Connected Wallet: {address}</div>
  <Transfer />
  
  </>);
};

export default ConnectedWallet;
