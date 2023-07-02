/* eslint-disable @next/next/no-img-element */
import { Event } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import Nav from "~/components/Nav";
import Section from "~/components/Section";
import { api } from "~/utils/api";

const ScheduleCard: React.FC<{
  event: Event;
}> = ({ event }) => {
  return (
    <div className="dark-gradient relative flex h-[300px] cursor-pointer items-end rounded-3xl p-5 text-white transition-all">
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
  );
};

const Schedule = () => {
  const { data: userEvents, isLoading } = api.user.getUserEvents.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  return (
    <>
      <Head>
        <title>EVNT - Schedule</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Nav />
        <h2 className="mt-10 font-primary text-6xl text-slate-800 underline">
          Schedule
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-8">
          {!isLoading && userEvents ? (
            userEvents.enrolledEvents.length > 0 ? (
              userEvents.enrolledEvents.map((enrolledEvent) => (
                <Link
                  href={`/room/${enrolledEvent.event.id}`}
                  key={enrolledEvent.id}
                >
                  <ScheduleCard event={enrolledEvent.event} />
                </Link>
              ))
            ) : (
              <>You have no enrolled events scheduled</>
            )
          ) : (
            <>Loading...</>
          )}
        </div>

        <h2 className="mt-10 font-primary text-6xl text-slate-800 underline">
          Your Events
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-8">
          {!isLoading && userEvents ? (
            userEvents.organizes.length > 0 ? (
              userEvents.organizes.map((event) => (
                <ScheduleCard event={event} key={event.id} />
              ))
            ) : (
              <>You are not hosting any events</>
            )
          ) : (
            <>Loading...</>
          )}
        </div>
      </Section>

      <Section className="my-10 rounded-3xl bg-slate-800 py-10 text-center font-primary text-2xl font-bold text-slate-100">
        Created With ❤️ By The Evnt Team
      </Section>
    </>
  );
};

export default Schedule;
