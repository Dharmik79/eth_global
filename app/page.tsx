"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { useContractRead, useContractReads } from "wagmi";
import abiJSONContractEventTicket from "../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../public/abi/contractEventTicketFactory.json";
import Loader from "./components/Loader";

const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};

const ReadSubContract = ({ address }: { address: `0x${string}` }) => {
  let eventData;

  const { data, isError, isLoading, error } = useContractReads({
    contracts: [
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "eventTime",
        args: [],
      },
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "eventTitle",
        args: [],
      },
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "eventURL",
        args: [],
      },
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "ticketPrice",
        args: [],
      },
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "totalTickets",
        args: [],
      },
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "paymentTokenAddress",
        args: [],
      },
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "_nextTokenId",
        args: [],
      },
    ],
  });

  if (data && data[0].status == "success" && !isLoading && !isError) {
    const event = {
      eventTime: data[0].result,
      eventTitle: data[1].result,
      eventURL: data[2].result,
      ticketPrice: data[3].result,
      totalTickets: data[4].result,
      paymentTokenAddress: data[5].result,
      nextTokenId: data[6].result,

      // ... process other data
    };
    eventData = event;
  }
  return { eventData, isLoading, isError };
};

const ReadParentContract = ({ number }: { number: number }) => {
  let events;
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contractEventTicketFactory,
        functionName: "eventTickets",
        args: [number],
      },
    ],
  });

  if (data && data[0].status == "success" && !isLoading && !isError) {
    const contractEventTicket = {
      address: data[0].result as `0x${string}`,
      abi: abiJSONContractEventTicket as any,
    };
    const eventData = ReadSubContract({ address: contractEventTicket.address });
    if (eventData.eventData) {
      events = eventData.eventData;
    }
  }

  return { events };
};
function Events() {
  let tickets = [];
  const [loading, setLoading] = useState(true);

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contractEventTicketFactory,
        functionName: "getEventTicketCount",
        args: [],
      },
    ],
  });

  if (data && data[0].status == "success" && !isLoading && !isError) {
    for (let i = data[0].result; i > 0; i--) {
      let DATA = ReadParentContract({ number: i });

      tickets.push(DATA.events);
    }
  }


  // tickets = tickets.filter((item) => item != undefined);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {tickets.map((ticket, i) => {
        return <Card data={ticket} key={i} type={true} />;
      })}
    </div>
  );
}

export default Events;
