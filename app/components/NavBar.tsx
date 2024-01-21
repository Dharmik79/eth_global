"use client";

import React, { use, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { setAddress, setConnected } from "@/lib/reducers/connectionSlice";
import { RootState } from "../../lib/store";

const navSecureItems = [
  {
    path: "/myevent",
    name: "My Tickets",
  },
  {
    path: "/event/create",
    name: "Create Event",
  },
];




export default function NavBar() {
  let pathname = usePathname() || "/";
  const dispatch = useDispatch();
  const { address, isConnecting, isConnected } = useAccount();

  
  const reduxIsConnected = useSelector(
    (state: RootState) => state.connection.isConnected
  );

  useEffect(() => {
    dispatch(setAddress(address || null));
    dispatch(setConnected(isConnected));
  }, [address, isConnected, dispatch]);

  const router = useRouter();

  useEffect(() => {
    if (!reduxIsConnected) {
      // Redirect to the home page if isReduxConnected becomes false
      router.push("/");
    }
  }, [reduxIsConnected, router]);
  return (
    <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-stone-900/80 backdrop-blur-md">
      <nav className="flex gap-20 relative justify-start w-full z-[100]  rounded-lg">
        <Link
          key={"/"}
          className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
            pathname == "/" ? "text-zinc-100" : "text-zinc-400"
          }`}
          href={"/"}
        >
          <span>{"Home"}</span>
        </Link>
       
        {reduxIsConnected &&
          navSecureItems.map((item, index) => {
            const isActive = item.path === pathname;

            return (
              <Link
                key={item.path}
                className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                  isActive ? "text-zinc-100" : "text-zinc-400"
                }`}
                href={item.path}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        <div className="absolute right-0 top-0 bottom-0 flex items-center">
          <ConnectKitButton />
        </div>
      </nav>
    </div>
  );
}
