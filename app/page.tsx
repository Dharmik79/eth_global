"use client";
import React from 'react'
import Card from './components/Card';
import { useContractRead, useContractReads } from "wagmi";
import abiJSONContractEventTicket from "../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../public/abi/contractEventTicketFactory.json";

const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};

function Events() {

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

  console.log("data FROM EVENTS ", data);  
  return (
    <div>
        <Card data/>
    </div>
  )
}

export default Events
