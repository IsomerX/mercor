/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { status } = useSession();
  return (
    <nav className="grid w-full grid-cols-3 border-b-2 border-slate-300 px-2 py-5">
      <div className="flex items-center gap-x-16 font-secondary text-lg text-slate-800 ">
        <Link href="/" className="transition-all hover:text-slate-500">
          Home
        </Link>
        <Link href="/discover" className="transition-all hover:text-slate-500">
          Discover
        </Link>
        <Link href="/schedule" className="transition-all hover:text-slate-500">
          Schedule
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <img src="/logo.svg" alt="logo" className="h-16 text-red-800" />
      </div>
      <div className="text-slate-80 transition-all0 flex items-center justify-end gap-x-16 font-secondary text-lg">
        <button className="transition-all hover:text-slate-500">Tickets</button>
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="transition-all hover:cursor-pointer hover:text-slate-500"
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/signin"
            className="hover:text-slate-499 font-medium underline transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
