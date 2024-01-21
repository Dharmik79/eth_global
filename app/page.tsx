"use client";

import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { ConnectKitButton } from "connectkit";

const HomePage = () => {
  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
        My Tickets
      </h1>
      <h3 className="text-xl sm:text-2xl text-white tracking-tight mb-6">
        Connect to your wallet to view your tickets
      </h3>

      <div className="flex justify-center items-center">
        <ConnectKitButton />
      </div>
    </>
  );
};
const App = () => {
  const reduxIsConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );
  return <>{reduxIsConnected ? "CNNC" : <HomePage />}</>;
};

export default App;
