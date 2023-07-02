import { NextPage } from "next";
import { CiTimer } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import type { Event, User } from "@prisma/client";

const Card: NextPage<Event & { organizer: User }> = (event) => {
  return (
    <div className="rounded-xl shadow-md max-w-[300px] text-white">
      <h1 className="p-3 text-xl bg-[#1E293B]">
        {event.name}
      </h1>
      <Image
        src="/corpo_event.jpeg"
        alt="alt"
        width={300}
        height={200}
        style={{ objectFit: "cover" }}
      />
      <div className="flex flex-col bg-white text-black p-3">
        <div className="py-1 flex">
          <AiOutlineUser
            fontSize={25}
            className="mr-3"
          />
          {event.organizer.name}
        </div>
        <div className="py-1 flex">
          <CiTimer
            fontSize={25}
            className="mr-3"
          />
          {event.beginsAt.toLocaleTimeString()}
        </div>


        <div className="flex justify-between">
          <div className="rounded-full px-3 bg-[#1E293B] text-white w-fit my-3">
            {event.capacity} Seats left!
          </div>
          <div className="rounded-full px-3 bg-[#1E293B] text-white w-fit my-3">
            {event.price} {/* rupee  symbol*/} Rs
          </div>
          <div className="rounded-full px-3 bg-[#1E293B] text-white w-fit my-3">
            {event.duration}min
          </div>
        </div>

        {/* Buy Ticket */}
        <div className="rounded-full justify-center px-3 bg-[#1E293B] text-white w-fit">
          Buy Ticket
        </div>
      </div>
    </div>
  );
};

export default Card;
