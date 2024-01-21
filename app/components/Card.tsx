import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import { useEffect, useRef, useState } from "react";

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

  const [args, setArgs] = useState<(string | number | bigint)[] | undefined>(
    undefined
  );

  const [buy, setBuy] = useState(false);

  // Prepare contract write with dynamic arguments
  const { config: configApprove } = usePrepareContractWrite({
    address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    abi: abiGHOToken,
    functionName: "approve",
    args: args,
  });
  const { config: configBuy } = usePrepareContractWrite({
    address: data?.contractAddress,
    abi: abiJSONContractEventTicket,
    functionName: "buyTicket",
    args: [],
  });

  const {
    data: contractWriteData,
    isLoading,
    isSuccess,
    write,
    error,
    isError,
  } = useContractWrite(configApprove);

  const {
    data: contractWriteDataBuy,
    isLoading: isLoadingBuy,
    isSuccess: isSuccessBuy,
    write: writeBuy,
    error: errorBuy,
    isError: isErrorBuy,
  } = useContractWrite(configBuy);

  const HandleBuyClick = () => {
    if (!isReduxConnected) {
      alert("Please Connect Wallet");
    } else {
      // approve the contract to spend the amount of tokens
      const newArgs = [
        data?.contractAddress,
        ethers.parseEther(data?.ticketPrice.toString() as string),
      ];
      setArgs(newArgs);
      // call another write once the approve is done
      // check if approved
      const dataTxApprove = WaitForTransactionData(contractWriteData?.hash);
      if (dataTxApprove) {
        setBuy(true);
      }

      // call buy ticket
      const dataTxBuy = WaitForTransactionData(contractWriteDataBuy?.hash);
      if (dataTxBuy) {
        alert("Ticket Bought");
      }
    }

    function WaitForTx(): { data: any } {
      return useWaitForTransaction({
        hash: contractWriteData?.hash,
      });
    }
    function WaitForTxBuy(): { data: any } {
      return useWaitForTransaction({
        hash: contractWriteDataBuy?.hash,
      });
    }
  };

  useEffect(() => {
    // Whenever args change and if write function is available, execute the contract write
    if (write && args) {
      write();
    }
  }, [write, args]);

  useEffect(() => {
    // Whenever args change and if write function is available, execute the contract write
    if (writeBuy && buy) {
      writeBuy();
    }
  }, [writeBuy, buy]);

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
    </div>
  );
};

export default Card;

function WaitForTransactionData(_hash: `0x${string}` | undefined) {
  const {
    data: dataWaitForTransaction,
    isError: isErrorWaitForTransaction,
    isLoading: isLoadingWaitForTransaction,
  } = useWaitForTransaction({
    hash: _hash,
  });

  return dataWaitForTransaction;
}
