import { getTopCastsByUser } from '../lib/farcaster';
import { getOgImageUrl } from '../lib/og';
import { FrameRequest, FrameResponse } from '@neynar/nodejs-sdk';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const fid = Number(searchParams.get("fid") || "0");
  if (!fid) return new Response("Fid required", { status: 400 });

  const casts = await getTopCastsByUser(fid);
  const ogImageUrl = getOgImageUrl(casts);

  const buttons = casts.map((cast, index) => ({
    label: `#${index + 1} by @${cast.author}`,
    action: "link",
    target: `https://warpcast.com/${cast.author}/${cast.hash}`
  }));

  const frame: FrameResponse = {
    version: "vNext",
    image: ogImageUrl,
    buttons,
    postUrl: "https://your-frame.vercel.app/frame"
  };

  return Response.json(frame);
}