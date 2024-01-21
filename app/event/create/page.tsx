"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader";
interface FormValues {
  eventName: string;
  eventTime: Date;
  maxAttendees: number | string;
  eventURL: string;
  // eventDescription: string;
  price: number;
}

export default function CreateEvent() {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: FormValues = {
    eventName: "",
    eventTime: new Date(),
    maxAttendees: "",
    eventURL: "",
    // eventDescription: "",
    price: 0,
  };

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    eventTime: Yup.date()
      .required("Event time is required")
      .min(new Date(), "Event time must be in the future"),
    maxAttendees: Yup.number()
      .required("Max attendees is required")
      .positive("Max attendees must be a positive number")
      .integer("Max attendees must be an integer")
      .min(1, "Max attendees must be greater than 0"),
    eventURL: Yup.string().url("Invalid URL").required("Event URL is required"),
    // eventDescription: Yup.string().required("Event description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive number or zero")
      .integer("Price must be an integer"),
  });

  return (
    <div className="bg-white text-gray-200 p-6">
      <Loader isLoading={isLoading} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async(values) => {
          console.log(values);
          setIsLoading(true); // Start loading
          try {
            // Simulate API call
            console.log(values);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock API call
          } catch (error) {
            console.error("Submission error:", error);
          } finally {
            setIsLoading(false); // Stop loading
          }
        }}
      >
        {({ setFieldValue, isValid, dirty, values }) => (
          <Form>
            <h1 className="text-3xl font-semibold mb-6">
              Create your next Event here!
            </h1>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Event Name
              </label>
              <Field
                name="eventName"
                type="text"
                placeholder="Name"
                className="bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 block w-full"
              />
              <ErrorMessage
                name="eventName"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Event Time
              </label>
              <DatePicker
                name="eventTime"
                className="bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 block w-full"
                selected={values.eventTime}
                onChange={(date: Date) => setFieldValue("eventTime", date)}
                dateFormat="Pp"
                minDate={new Date()}
              />
              <ErrorMessage
                name="eventTime"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Max Attendees
              </label>
              <Field
                name="maxAttendees"
                type="number"
                placeholder="10"
                className="bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 block w-full"
              />
              <ErrorMessage
                name="maxAttendees"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Event URL
              </label>
              <Field
                name="eventURL"
                type="text"
                placeholder="URL"
                className="bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 block w-full"
              />
              <ErrorMessage
                name="eventURL"
                component="div"
                className="text-red-500"
              />
            </div>

           {/* <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Event Description
              </label>
              <Field
                as="textarea"
                name="eventDescription"
                className="bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 block w-full"
              />
              <ErrorMessage
                name="eventDescription"
                component="div"
                className="text-red-500"
              />
        </div>*/}

            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Ticket Price (GHO)</label>
              <Field
                type="number"
                name="price"
                className="bg-gray-700 border border-gray-600 text-white rounded-md py-2 px-4 block w-full"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex items-center justify-start mt-6">
              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={`py-2 px-4 rounded font-bold ${
                  isValid && dirty
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
