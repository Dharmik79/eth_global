"use client";

import Image from "next/image";
import React, { useState, FormEvent } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useSendTransaction  } from 'wagmi' 
import { parseEther } from 'viem' 
interface IWalletAddress {
  address: string;
  tokens: number;
}

interface Props {
  address: string;
}

export default function Transfer({ address }: Props) {
  
  const { 
    data: hash,  
    sendTransaction 
  } = useSendTransaction() 
  
  const handleSubmit = (
    values: IWalletAddress,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    sendTransaction({ to: values.address, value: BigInt(values.tokens || 0) });
    setSubmitting(false);
  };
  return (
    <div className="container">
      <Formik
        initialValues={{
          address: "",
          tokens: 0,
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

          <label htmlFor="tokens">Number of Tokens</label>
          <Field
            id="tokens"
            name="tokens"
            placeholder="Enter the Tokens"
            type="number"
            style={{ color: "black" }}
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <div>Connected Wallet: {address}</div>
    </div>
  );
}
