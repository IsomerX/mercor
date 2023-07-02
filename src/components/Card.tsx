/* eslint-disable @next/next/no-img-element */
import type { Event, User } from "@prisma/client";
import type { api } from "~/utils/api";
import { useState } from "react";

const CardInfoModal: React.FC<{
  event: Event & { organizer: User };
  visible: boolean;
  setVisible: (visible: boolean) => void;
  mutation: ReturnType<typeof api.user.enrollUser.useMutation>;
  isPurchased: boolean;
}> = ({ event, visible, setVisible, mutation, isPurchased }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed left-0 top-0 z-30 grid h-screen w-screen place-items-center bg-black/20"
      onClick={(e) => {
        e.stopPropagation();
        setVisible(false);
      }}
    >
      <div
        className="flex max-h-[80vh] w-[600px] flex-col gap-5 rounded-3xl bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/concert.jpeg"
          className="h-[350px] w-full rounded-3xl object-cover"
          alt=""
        />
        <h3 className="font-primary text-5xl">{event.name}</h3>
        <div className="font-secondary text-slate-600">
          <div className="text-xl font-bold text-slate-700">Organised By:</div>
          {event.organizer.name}
        </div>
        <div className="font-secondary text-slate-600">
          <div className="text-xl font-bold text-slate-700">
            Total Seats Left:
          </div>

          {event.capacity}
        </div>
        {isPurchased ? (
          <h3 className="text-center font-primary text-2xl">
            Already Enrolled!
          </h3>
        ) : (
          <button
            className={`${
              mutation.isLoading ? "bg-slate-600" : "bg-slate-800"
            } w-full cursor-pointer rounded-2xl bg-slate-800 px-8 py-4 font-primary text-2xl text-white transition-all hover:bg-slate-700 hover:opacity-90`}
            onClick={() => {
              mutation.mutate({ eventId: event.id });
            }}
            disabled={mutation.isLoading}
          >
            {!mutation.isLoading ? `Buy Now at: ${event.price}` : "Processing"}
          </button>
        )}
      </div>
    </div>
  );
};

const Card: React.FC<{
  event: Event & { organizer: User };
  mutation: ReturnType<typeof api.user.enrollUser.useMutation>;
  isPurchased: boolean;
}> = ({ event, mutation, isPurchased }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <CardInfoModal
        event={event}
        visible={modalVisible}
        setVisible={setModalVisible}
        mutation={mutation}
        isPurchased={isPurchased}
      />
      <div
        className="dark-gradient relative flex h-[300px] cursor-pointer items-end rounded-3xl p-5 text-white transition-all"
        onClick={() => setModalVisible(!modalVisible)}
      >
        <img
          src="/concert.jpeg"
          className=" absolute left-0 top-0 -z-10 h-full w-full rounded-3xl object-cover"
          alt=""
        />
        {/* Buy Ticket With Good looking button*/}
        <div className="w-full">
          <div className="truncate font-primary text-4xl text-white/40">
            {event.name}
          </div>
          <div className="font-secondary text-xl text-white/60">
            {new Date(event.beginsAt).toLocaleString("en-us", {
              weekday: "short",
              year: "numeric",
              month: "long",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
