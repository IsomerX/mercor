/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="grid w-full grid-cols-3 border-b-2 border-slate-300 px-2 py-5">
      <div className="flex items-center gap-x-16 font-secondary text-lg text-slate-800 ">
        <button className="transition-all hover:text-slate-500">Home</button>
        <button className="transition-all hover:text-slate-500">
          Discover
        </button>
        <button className="transition-all hover:text-slate-500">
          Schedule
        </button>
      </div>
      <div className="flex items-center justify-center">
        <img src="/logo.svg" alt="logo" className="h-16 text-red-800" />
      </div>
      <div className="text-slate-80 transition-all0 flex items-center justify-end gap-x-16 font-secondary text-lg">
        <button className="transition-all hover:text-slate-500">Tickets</button>
        <Link href="/auth/signin" className="font-medium underline transition-all hover:text-slate-499">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
