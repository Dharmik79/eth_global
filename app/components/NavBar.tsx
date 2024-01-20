"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
const navItems = [
  {
    path: "/",
    name: "Home",
  },
];

export default function NavBar() {
  let pathname = usePathname() || "/";

  return (
    <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-stone-900/80 backdrop-blur-md">
      <nav className="flex gap-20 relative justify-start w-full z-[100]  rounded-lg">
        {navItems.map((item, index) => {
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
