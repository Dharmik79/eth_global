"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { RootState } from "../../lib/store";

const Layout = ({ children }: { children: any }) => {
  const isReduxConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );
  const router = useRouter();

  useEffect(() => {
    if (!isReduxConnected) {
      // Redirect to the home page if disconnected
      router.replace("/");
    }
  }, [isReduxConnected, router]);

  //   // If the user is not connected, render nothing (or a loading indicator)
  //   if (!isReduxConnected) {
  //     return null;
  //   }

  return <>{children}</>;
};

export default Layout;
