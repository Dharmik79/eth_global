"use client";

import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { ConnectKitButton } from "connectkit";
import Card from "./components/Card";

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

const MyTicketsPage = () => {
  return  <>
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
    My Tickets
  </h1>


  <div className="flex justify-center items-center">
  <Card data/>
  </div>
</>

}
const App = () => {
  const reduxIsConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );
  return <>{reduxIsConnected ? <MyTicketsPage/>: <HomePage />}</>;
};

export default App;
