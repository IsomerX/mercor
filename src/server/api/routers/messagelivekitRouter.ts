import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { AccessToken } from 'livekit-server-sdk';
import { env } from '~/env.mjs'
import type { AccessTokenOptions, VideoGrant } from 'livekit-server-sdk';

const apiKey = env.LIVEKIT_API_KEY;
const apiSecret = env.LIVEKIT_API_SECRET;

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

export const messagelivekitRouter = createTRPCRouter({
  getToken: publicProcedure
    .input(
      z.object({
        roomName: z.string(),
        identity: z.string(),
        name: z.string(),
        metadata: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const { roomName, identity, name, metadata } = input;
      const grant = {
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
      };

      // Create an instance of AccessToken without API key and secret
      const at = new AccessToken({ identity, name, metadata });
      at.addGrant(grant);
      const token = at.toJwt();

      roomName.on(RoomEvent.DataReceived, (payload, participant, kind) => {
        const strData = new TextDecoder().decode(payload);
        console.log(`Received data from ${participant.identity}: ${strData}`);
      });

      return { accessToken: token };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
