import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useEffect, useRef, useState } from "react";

import abiJSONContractEventTicket from "../../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../../public/abi/contractEventTicketFactory.json";
import moment from "moment";
const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};

// On Click Submit check for the status of the wallet and if not connected then connect the wallet
const Card = ({ data, key }: { data: any; key: number }) => {
  const isReduxConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  const handleBuyClick = () => {
    if (!isReduxConnected) {
      alert("Please Connect Wallet");
    } else {
      console.log("Buy Ticket");
    }
  };

  const ticketsLeft = Number(data?.totalTickets) - Number(data?.ticketSold);

  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-800">
          {data?.eventTitle}
        </h3>

        <p className="text-gray-700">
          Ticket Price:
          {data.ticketPrice && ethers
            .formatEther(data.ticketPrice as unknown as ethers.BigNumberish)
            .toString()}
          GHO
          <br />
          Event Date:{" "}
          {moment(Number(data?.eventTime) * 1000).format("MMMM Do, YYYY")}
          <br />
          Event Time: {moment(Number(data?.eventTime) * 1000).format("hh:mm a")}
          <br />
          Event Link:{" "}
          <a href={data?.eventURL} target="_blank" className="underline">
            Link
          </a>
          <br />
          Tickets Left : {ticketsLeft}
        </p>
      </div>
      <div className="px-5 py-3 bg-gray-100">
        <button
          className={`w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white ${ticketsLeft?"bg-blue-600 rounded-lg hover:bg-blue-700":"bg-gray-500"} focus:outline-none`}
          onClick={() => {
            handleBuyClick();
          }}
          disabled={ticketsLeft == 0}
        >
          {ticketsLeft ? "Buy Ticket" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default Card;
