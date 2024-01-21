"use client";
import React from "react";
import Card from "./components/Card";
import { useContractRead, useContractReads } from "wagmi";
import abiJSONContractEventTicket from "../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../public/abi/contractEventTicketFactory.json";

const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};

const ReadSubContract = ({ address }: { address: `0x${string}` }) => {
  try
  {const { data, isError, isLoading, error } = useContractReads({
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
  if (data?.length > 0 && data[0].status == "success") {
    const event = {
      eventTime: data[0].result,
      eventTitle: data[1].result,
      eventURL: data[2].result,
      ticketPrice: data[3].result,
      totalTickets: data[4].result,
      paymentTokenAddress: data[5].result,
      ticketSold: data[6].result,
    };
    return event;
  }}
  catch (e) {
    console.log(e);
  }
};

const ReadParentContract = ({ number }: { number: number }) => {
 try{ const { data} = useContractReads({
    contracts: [
      {
        ...contractEventTicketFactory,
        functionName: "eventTickets",
        args: [number],
      },
    ],
  });

  if (data?.length > 0 && data[0].status == "success") {
    const contractEventTicket = {
      address: data[0]?.result as `0x${string}`,
      abi: abiJSONContractEventTicket as any,
    };
    return  ReadSubContract({ address: contractEventTicket.address });
  }}
  catch (e) {
    console.log(e);
  }
};
function Events() {
  let tickets = [];

  const { data, isError, isLoading, error } = useContractReads({
    contracts: [
      {
        ...contractEventTicketFactory,
        functionName: "getEventTicketCount",
        args: [],
      },
    ],
  });
  if (data?.length > 0 && data[0].result && data[0].status == "success") {
    for (let i = 0; i < data[0].result; i++) {
      let result = ReadParentContract({ number: i });
      if (result) {
        tickets.push(result);
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {tickets.map((ticket, i) => {
        return <Card data={ticket} key={i} />;
      })}
    </div>
  );
}

export default Events;
