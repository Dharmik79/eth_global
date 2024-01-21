import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useEffect, useRef, useState } from "react";

import abiJSONContractEventTicket from "../../public/abi/contractEventTicket.json";
import abiJSONContractEventTicketFactory from "../../public/abi/contractEventTicketFactory.json";

const contractEventTicketFactory = {
  address: process.env
    .NEXT_PUBLIC_EVENT_TICKET_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiJSONContractEventTicketFactory as any,
};

// On Click Submit check for the status of the wallet and if not connected then connect the wallet
const Card = ({ data }: { data: any }) => {
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

  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-800">
          Ticket Name: {data?.[0]?.result?.toString()}
        </h3>
        {data?.[1]?.result && (
          <p className="mb-4 text-base text-gray-600">
            Ticket Price:{" "}
            {ethers
              .formatEther(data[1].result as unknown as ethers.BigNumberish)
              .toString()}{" "}
            ETH
          </p>
        )}
        <p className="text-gray-700">
          Event Venue: Vancouver, BC
          <br />
          Event Date: 31 Oct 2023, 11 pm
        </p>
      </div>
      <div className="px-5 py-3 bg-gray-100">
        <button
          className="w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => {
            handleBuyClick();
          }}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default Card;
