"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { ConnectKitButton } from "connectkit";
import Card from "../components/Card";



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

  return <><MyTicketsPage/></>;
};

export default App;
