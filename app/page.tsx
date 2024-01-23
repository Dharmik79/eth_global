"use client";
import React, { use, useEffect, useState } from "react";
import Card from "./components/Card";
import { readContracts, useContractRead, useContractReads } from "wagmi";
import abiJSONContractEventTicket from "../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../public/abi/contractEventTicketFactory.json";
import Loader from "./components/Loader";

const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};
// import { WagmiConfig, createConfig } from "wagmi";
// import { sepolia } from "wagmi/chains";
// import { getDefaultConfig } from "connectkit";
// const chains = [sepolia];

// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: process.env.ALCHEMY_ID, // or infuraId
//     walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
//     // Required
//     appName: "Your App Name",
//     // Optional
//     appDescription: "Your App Description",
//     appUrl: "https://family.co", // your app's url
//     appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//     chains,
//   })
// );

const ReadSubContract = async ({ address }: { address: `0x${string}` }) => {
  let eventData;

  const res = await readContracts({
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

  // const { data, isError, isLoading, error } = useContractReads({
  //   contracts: [
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "eventTime",
  //       args: [],
  //     },
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "eventTitle",
  //       args: [],
  //     },
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "eventURL",
  //       args: [],
  //     },
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "ticketPrice",
  //       args: [],
  //     },
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "totalTickets",
  //       args: [],
  //     },
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "paymentTokenAddress",
  //       args: [],
  //     },
  //     {
  //       address: address,
  //       abi: abiJSONContractEventTicket as any,
  //       functionName: "_nextTokenId",
  //       args: [],
  //     },
  //   ],
  // });

  if (res) {
    const event = {
      eventTime: res[0].result,
      eventTitle: res[1].result,
      eventURL: res[2].result,
      ticketPrice: res[3].result,
      totalTickets: res[4].result,
      paymentTokenAddress: res[5].result,
      nextTokenId: res[6].result,

      // ... process other data
    };
    eventData = event;
  }
  return { eventData };
};

const ReadParentContract = async ({ number }: { number: number }) => {
  let events;
  const data = await readContracts({
    contracts: [
      {
        ...contractEventTicketFactory,
        functionName: "eventTickets",
        args: [number],
      },
    ],
  });

  if (data) {
    const contractEventTicket = {
      address: data[0].result as unknown as `0x${string}`,
      abi: abiJSONContractEventTicket as any,
    };
    const eventData = await ReadSubContract({
      address: contractEventTicket.address,
    });
    console.log(eventData);
    if (eventData) {
      events = eventData;
    }
  }

  return { events };
};

export default function Events() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    let eventCount;
    const eventCountCall = readContracts({
      contracts: [
        {
          ...contractEventTicketFactory,
          functionName: "getEventTicketCount",
          args: [],
        },
      ],
    })
      .then(async (res) => {
        const eventCount = res[0].result as unknown as number;
        let updatedTickets = [];
        for (let i = eventCount; i > 0; i--) {
          let DATA = await ReadParentContract({ number: i });
          console.log(`event${i}`, DATA);
          if (DATA.events) {
            updatedTickets.push(DATA.events);
          }
        }
        setTickets(updatedTickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!tickets) {
    return <Loader isLoading={true} />;
  }
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {tickets.map((ticket, i) => {
        if (ticket) {
          return <Card key={i} data={ticket} type={true} />;
        }
      })}
    </div>
  );
}
