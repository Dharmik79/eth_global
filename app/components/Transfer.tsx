

"use client";

import Image from "next/image";
import React, { useState, FormEvent } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface IWalletAddress {
  address: string;
}



export default function Transfer() {
  const handleSubmit = (
    values: IWalletAddress,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(false);
  };
  return (
    <div className="container">
      <Formik
        initialValues={{
          address: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        <Form>
          <label htmlFor="address">Wallet Address</label>
          <Field
            id="address"
            name="address"
            placeholder="Enter the address"
            type="text"
            style={{ color: "black" }}
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

