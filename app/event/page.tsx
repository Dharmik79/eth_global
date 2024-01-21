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

const ReadSubContract = ({
  address,
  userAddress,
}: {
  address: `0x${string}`;
  userAddress: `0x${string}`;
}) => {
  try
{  const { data } = useContractReads({
    contracts: [
      {
        address: address,
        abi: abiJSONContractEventTicket as any,
        functionName: "balanceOf",
        args: [userAddress],
      },
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

  if (data?.length > 0 && data[0].status == "success" && data[0].result > 0) {
    const event = {
      eventTime: data[1].result,
      eventTitle: data[2].result,
      eventURL: data[3].result,
      ticketPrice: data[4].result,
      totalTickets: data[5].result,
      paymentTokenAddress: data[6].result,
      ticketSold: data[7].result,
    };
    return event;
  }}
  catch(e)
  {
    console.log(e);
  }
};

const ReadParentContract = ({
  number,
  address,
}: {
  number: number;
  address: `0x${string}`;
}) => {
  try{

  
  const { data, isError, isLoading, error } = useContractReads({
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
    return ReadSubContract({
      address: contractEventTicket.address,
      userAddress: address,
    });
  }
} catch(e)
{
  console.log(e);
}
};
const MyTicketsPage = () => {
  let tickets = [];

  const reduxAddress = useSelector(
    (state: RootState) => state.connection.address
  );

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
      let result = ReadParentContract({ number: i, address: reduxAddress });
      if (result) {
        tickets.push(result);
      }
    }
  }

  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
        My Tickets
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            return <Card data={ticket} key={index} />;
          })
        ) : (
          <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            No Tickets Found
          </div>
        )}
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
