import type { AccessTokenOptions, VideoGrant } from 'livekit-server-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk';
import { env } from '~/env.mjs'
import z from 'zod'

const apiKey = env.LIVEKIT_API_KEY;
const apiSecret = env.LIVEKIT_API_SECRET;

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

export default async function handleToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const querySchema = z.object({
      roomName: z.string(),
      identity: z.string(),
      name: z.string(),
      metadata: z.string().optional(),
    })
    const { roomName, identity, name, metadata } = querySchema.parse(req.query)
    // if (!userSession.isAuthenticated) {
    //   res.status(403).end();
    //   return;
    // }
    const grant: VideoGrant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };
    const token = createToken({ identity, name, metadata }, grant);
    res.status(200).json({ identity, accessToken: token });

  } catch (e) {
    res.statusMessage = JSON.stringify((e as Error).message);
    res.status(500).end();
  }
}