import { env } from "~/env.mjs";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { type Event } from "@prisma/client";

type Props = {
  event: Event | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  { params, req, res },
) => {
  const { id } = params as { id: string };
  const user = await getServerAuthSession({ req, res });
  const eventExists = prisma.eventEnrollment.findFirst({
    where: { userId: user?.user.id, eventId: id },
  });
  const authorized = eventExists !== null;
  let event: Event | null = null;
  if (authorized) event = await prisma.event.findFirst({ where: { id: id } });

  return { props: { event } };
};

const Room: NextPage<Props> = ({ event }) => {
  if (event === null) return <>Unauthorized</>;

  const params = typeof window !== "undefined"
    ? new URLSearchParams(location.search)
    : null;
  const roomName = params?.get("room") ?? "test-room";
  const userIdentity = params?.get("user") ?? "test-identitysdf";
  const token = api.livekit.getToken.useQuery({
    identity: userIdentity,
    roomName,
    name: userIdentity,
  }, { refetchOnWindowFocus: false });

  return (
    <div data-lk-theme="default" style={{ height: "100vh" }}>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token.data?.accessToken}
        serverUrl={env.NEXT_PUBLIC_LIVEKIT_URL}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

export default Room;
