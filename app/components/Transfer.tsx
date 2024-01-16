"use client";

import Image from "next/image";
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import {
  useSendTransaction,
  useWaitForTransaction,
  type BaseError,
} from "wagmi";
import { parseEther } from "viem";
interface IWalletAddress {
  address: string;
  tokens: number;
}

interface Props {
  address: string;
}

export default function Transfer({ address }: Props) {
  const { data: hash, error, sendTransaction } = useSendTransaction();

  const handleSubmit = (
    values: IWalletAddress,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    sendTransaction({
      to: values.address,
      value: parseEther(values.tokens.toString()),
    });
    setSubmitting(false);
  };

  const formikRef = useRef<FormikProps<any>>(null);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransaction({
      hash: hash?.hash,
    });

  useEffect(() => {
    formikRef.current?.resetForm();
  }, [hash]);
  return (
    <div className="container">
      <Formik
        innerRef={formikRef}
        initialValues={{
          address: "",
          tokens: 0,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({
          isSubmitting,
          getFieldProps,
          handleChange,
          handleBlur,
          values,
          resetForm,
        }) => (
          <Form>
            <label htmlFor="address">Wallet Address</label>
            <Field
              id="address"
              name="address"
              placeholder="Enter the address"
              type="text"
              values={values.address}
              style={{ color: "black" }}
            />

            <label htmlFor="tokens">Number of Tokens</label>
            <Field
              id="tokens"
              name="tokens"
              placeholder="Enter the Tokens"
              type="number"
              style={{ color: "black" }}
              values={values.tokens}
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {hash && <div>Transaction Hash: {hash.hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && <div>{(error as BaseError).shortMessage || error.message}</div>}
      <div>Connected Wallet: {address}</div>
    </div>
  );
}
