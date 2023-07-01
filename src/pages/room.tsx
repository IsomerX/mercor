import type { GetServerSideProps } from "next";
import { env } from "../env.mjs"
import { LiveKitRoom, useToken, VideoConference } from '@livekit/components-react';

import type { NextPage } from 'next';

type Props = {}

const Room: NextPage<Props> = ({ }) => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(location.search) : null;
  const roomName = params?.get('room') ?? 'test-room';
  const userIdentity = params?.get('user') ?? 'test-identity';

  const token = useToken('/api/livekit', roomName, {
    userInfo: {
      identity: userIdentity,
      name: userIdentity,
    },
  });

  return (
    <div data-lk-theme="default" style={{ height: '100vh' }}>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={env.NEXT_PUBLIC_LIVEKIT_URL}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
};

/**
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {},
  };
}
*/

export default Room;