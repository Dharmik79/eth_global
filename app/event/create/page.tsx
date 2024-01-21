"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="bg-white text-gray-200 p-6">
      <h1 className="text-3xl font-semibold mb-6">Create your next Event here!</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Event Name</label>
        <input
          type="text"
          className="bg-gray-700 border border-gray-500 text-gray-300 rounded-lg py-3 px-4 block w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter event name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Event Time</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="bg-gray-700 border border-gray-500 text-gray-300 rounded-lg py-3 px-4 block w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          showTimeSelect
          dateFormat="Pp"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Max Attendees</label>
        <input
          type="number"
          className="bg-gray-700 border border-gray-500 text-gray-300 rounded-lg py-3 px-4 block w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="99"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Event URL</label>
        <input
          type="url"
          className="bg-gray-700 border border-gray-500 text-gray-300 rounded-lg py-3 px-4 block w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter event URL"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Event Description</label>
        <textarea
          className="bg-gray-700 border border-gray-500 text-gray-300 rounded-lg py-3 px-4 block w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Describe your event"
        ></textarea>
      </div>

      <div className="flex items-center justify-start space-x-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50">Cancel</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Create</button>
      </div>
    </div>
  );
}
