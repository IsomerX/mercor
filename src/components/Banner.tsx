/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <>
      <div className="flex h-4/5 flex-col justify-center py-20">
        <div className="flex flex-col gap-7 font-primary text-8xl font-extrabold tracking-wide text-slate-900">
          <div>Find Amazing Events</div>
          <div className="flex flex-wrap items-center gap-5">
            happening in{" "}
            <img
              src="/photo2.webp"
              className="min-w-6 h-24 w-1/4 rounded-full bg-right-bottom object-cover grayscale"
              alt=""
            />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            Your{" "}
            <img
              src="/photo.webp"
              className="min-w-6 h-24 w-1/6 rounded-full bg-right-bottom object-cover grayscale"
              alt=""
            />
            City.
          </div>
        </div>
        <div>
          <p className="mt-16 w-2/3 font-secondary text-xl font-light text-slate-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quis
            aperiam quasi tenetur sit placeat quisquam esse itaque rem, optio a
            laudantium atque iusto sunt ut at nobis in velit. Lorem ipsum dolor
            sit amet consectetur adipisicing elit.
          </p>
          <div className="flex gap-3">
            <Link href="/discover">
              <button className="floating mt-10 cursor-pointer rounded-2xl bg-slate-800 px-8 py-4 font-primary text-2xl text-white transition-all hover:bg-slate-700 hover:opacity-90">
                Discover Events
              </button>
            </Link>
            <button className="floating mt-10 rounded-2xl bg-slate-800 px-8 py-4 font-primary text-2xl text-white transition-all hover:opacity-90">
              Create Them!
            </button>
          </div>
        </div>
      </div>
      <img
        src="/wave.svg"
        className="absolute bottom-0 right-0 -z-10 w-full"
        alt=""
      />
    </>
  );
};

export default Banner;
