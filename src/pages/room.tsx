import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { env } from "../env.mjs"


export default () => {
  const room = "quickstart-room";
  const name = "quickstart-user"; // TODO: interpolate with user name
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/livekit?room=${ room }&username=${ name }`);
      const data = await resp.json();
      setToken(data.token);
    })();
  }, []);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      serverUrl={env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={true}
      audio={true}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
