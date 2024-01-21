import { ethers } from 'ethers';

const Card = ({ data }: { data: any }) => {
    return (
      <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            Ticket Name: {data?.[0]?.result?.toString()}
          </h3>
          {data?.[1]?.result && (
            <p className="mb-4 text-base text-gray-600">
              Ticket Price: {ethers.formatEther(data[1].result as unknown as ethers.BigNumberish).toString()} ETH
            </p>
          )}
          <p className="text-gray-700">
            Event Venue: Vancouver, BC
            <br />
            Event Date: 31 Oct 2023, 12 pm
          </p>
        </div>
        <div className="px-5 py-3 bg-gray-100">
          <button className="w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
            Buy Ticket
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;
  