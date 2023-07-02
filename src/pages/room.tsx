import { env } from "../env.mjs"
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import type { NextPage } from 'next';
import { api } from "~/utils/api";

type Props = {}

const Room: NextPage<Props> = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(location.search) : null;
  const roomName = params?.get('room') ?? 'test-room';
  const userIdentity = params?.get('user') ?? 'test-identitysdf';
  const token = api.livekit.getToken.useQuery({ identity: userIdentity, roomName, name: userIdentity }, { refetchOnWindowFocus: false });

  return (
    <div data-lk-theme="default" style={{ height: '100vh' }}>
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
