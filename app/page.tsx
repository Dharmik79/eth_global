"use client";

import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
const App = () => {
  const reduxIsConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );
  return (
    <div>
      {reduxIsConnected ? "Welcome to the Home Page" : "Not connected "}
    </div>
  );
};

export default App;
