import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useEffect, useRef, useState } from "react";
import React from "react";
import abiJSONContractEventTicket from "../../public/abi/contractEventTicket.json";
import abiGHOToken from "../../public/abi/GHOToken.json";

import moment from "moment";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

// On Click Submit check for the status of the wallet and if not connected then connect the wallet
const Card = ({
  data,
  key,
  type = true,
}: {
  data: any;
  key: number;
  type: boolean;
}) => {
  const isReduxConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  const [buy, setBuy] = useState(false);

  const HandleBuyClick = () => {
    if (!isReduxConnected) {
      alert("Please Connect Wallet");
    } else {
      setBuy(true);
      // approve the contract to spend the amount of tokens
    }
  };

  const ticketsLeft = Number(data?.totalTickets) - Number(data?.ticketSold);

  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-5">
        <h3 className="mb-2 text-2xl font-bold text-gray-800">
          {data?.eventTitle}
        </h3>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Ticket Price:</span>
          {data.ticketPrice &&
            ethers
              .formatEther(data.ticketPrice as unknown as ethers.BigNumberish)
              .toString()}{" "}
          GHO
          <br />
          <span className="font-semibold">Event Date:</span>
          {moment(Number(data?.eventTime) * 1000).format("MMMM Do, YYYY")}
          <br />
          <span className="font-semibold">Event Time:</span>
          {moment(Number(data?.eventTime) * 1000).format("hh:mm a")}
          <br />
          <span className="font-semibold">Event Link:</span>
          <a
            href={data?.eventURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline">
            Link
          </a>
          <br />
          {type && (
            <span className="font-semibold">Tickets Left: {ticketsLeft}</span>
          )}
        </p>
      </div>
      {type && (
        <div className="px-5 py-3 bg-gray-100">
          <button
            className={`w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-300 ${
              ticketsLeft
                ? "bg-blue-600 hover:bg-blue-700 rounded-lg"
                : "bg-gray-500 hover:bg-gray-600"
            } focus:outline-none`}
            onClick={() => {
              HandleBuyClick();
            }}
            disabled={ticketsLeft == 0}>
            {ticketsLeft ? "Buy Ticket" : "Sold Out"}
          </button>
        </div>
      )}
      {buy && <NewFn _data={data} />}
    </div>
  );
};

export default Card;

function NewFn({ _data }: { _data: any }) {
  // approve the contract to spend the amount of tokens
  let newArgs = [
    _data?.contractAddress?.toString(),
    Number(_data?.ticketPrice || 0),
  ];
  console.log(newArgs);
  // Prepare contract write with dynamic arguments
  const { config: configApprove } = usePrepareContractWrite({
    address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    abi: abiGHOToken,
    functionName: "approve",
    args: newArgs,
  });

  const {
    data: contractWriteData,
    isLoading,
    isSuccess,
    write,
    error,
    isError,
  } = useContractWrite(configApprove);

  // if ticket price is 0 then mint the ticket
  if (Number(_data?.ticketPrice || 0) == 0) {
    return <MintTicket _data={_data}></MintTicket>;
  }

  if (contractWriteData) {
    return (
      <>
        <MintTicket _data={_data}></MintTicket>
      </>
    );
  }

  return (
    <div className="px-5 py-3 bg-gray-100">
      <button
        className={`w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-300 ${
          isLoading ? "bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
        } focus:outline-none`}
        onClick={() => {
          write();
        }}>
        {isLoading ? "Loading" : "Approve"}
      </button>
    </div>
  );
}

function MintTicket({ _data }: { _data: any }) {
  const { config: configBuy } = usePrepareContractWrite({
    address: _data?.contractAddress,
    abi: abiJSONContractEventTicket,
    functionName: "buyTicket",
    args: [],
  });

  const {
    data: contractWriteDataBuy,
    isLoading: isLoadingBuy,
    isSuccess: isSuccessBuy,
    write: writeBuy,
    error: errorBuy,
    isError: isErrorBuy,
  } = useContractWrite(configBuy);

  if (contractWriteDataBuy) {
    return (
      <>
        <div className="px-5 py-3 bg-gray-100">
          <button
            className={`w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-300 bg-green-400 focus:outline-none`}>
            Minted
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="px-5 py-3 bg-gray-100">
      <button
        className={`w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-300 ${
          isLoadingBuy ? "bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
        } focus:outline-none`}
        onClick={() => {
          writeBuy();
        }}>
        {isLoadingBuy ? "Loading" : "Mint Ticket"}
      </button>
    </div>
  );
}
