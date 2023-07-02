import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { AccessToken } from "livekit-server-sdk";
import type { AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import type { NextPage } from "next";
import type { GetServerSideProps } from "next";
import type { Event } from "@prisma/client";

type Props = {
  token: string | null;
  ended: boolean | null;
  notStarted: boolean | null;
  eventName: string | null;
  isHost: boolean;
};

const apiKey = env.LIVEKIT_API_KEY;
const apiSecret = env.LIVEKIT_API_SECRET;

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  { params, req, res },
) => {
  const { id } = params as { id: string };
  const session = await getServerAuthSession({ req, res });
  const enrollment = await prisma.eventEnrollment.findFirst({
    where: { userId: session?.user.id, eventId: id },
    include: { event: true, user: true },
  });

  const authorized = enrollment !== null;
  let token: string | null = null;
  let ended: boolean | null = null
  let notStarted: boolean | null = null
  let isHost = false;

  if (authorized) {
    isHost = enrollment.event.organizerID === session?.user.id;
    const grant: VideoGrant = {
      room: enrollment.event.id,
      roomJoin: true,
      canPublish: isHost,
      canPublishData: true,
      canSubscribe: true,
    };
    // beginsAt + duration (in minutes) should be less than current time
    ended = new Date(enrollment.event.beginsAt).getTime() + enrollment.event.duration * 60 * 1000 < Date.now()
    notStarted = new Date(enrollment.event.beginsAt).getTime() > Date.now();

    if (!ended) {
      token = createToken({
        identity: enrollment.user.id,
        name: enrollment.user.name || "Anonymous",
        metadata: undefined,
      }, grant);
    }
  }

  return { props: { token, eventName: enrollment?.event.name ?? null, ended, notStarted, isHost } };
};

const Room: NextPage<Props> = ({ token, ended, eventName, notStarted, isHost }) => {
  if (token === null) return <>Unauthorized</>;
  if (ended) return (<div>Event {eventName ?? ""} has ended</div>);
  if (notStarted) return (<div>The event {eventName ?? ""} is yet to begin!</div>);

  return (
    <div data-lk-theme="default" style={{ height: "100vh" }}>
      <LiveKitRoom
        video={isHost}
        audio={isHost}
        token={token}
        serverUrl={env.NEXT_PUBLIC_LIVEKIT_URL}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

export default Room;
