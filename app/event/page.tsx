"use client";
import { useContractRead, useContractReads } from "wagmi";

import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { ConnectKitButton } from "connectkit";
import Card from "../components/Card";

import abiJSONContractEventTicket from "../../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../../public/abi/contractEventTicketFactory.json";

const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};

const MyTicketsPage = () => {
  const { data, isError, isLoading, error } = useContractReads({
    contracts: [
      {
        ...contractEventTicketFactory,
        functionName: "getEventTicketCount",
        args: [],
      },
      {
        ...contractEventTicketFactory,
        functionName: "eventTickets",
        args: [0],
      },
    ],
  });

  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
        My Tickets
      </h1>

      <div className="flex justify-center items-center">
        <Card data />
      </div>
    </>
  );
};
const App = () => {
  return (
    <>
      <MyTicketsPage />
    </>
  );
};

export default App;
