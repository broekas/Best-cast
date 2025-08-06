import { neynarClient } from './neynar';

export async function getTopCastsByUser(fid: number, count = 3) {
  const res = await neynarClient.fetchUserCasts(fid, { limit: 25 });
  const scored = res.casts
    .map((cast) => ({
      hash: cast.hash,
      text: cast.text,
      reactions: cast.reactions.count,
      replies: cast.replies.count,
      recasts: cast.recasts.count,
      total: cast.reactions.count + cast.replies.count + cast.recasts.count,
      author: cast.author.username,
    }))
    .sort((a, b) => b.total - a.total);
  return scored.slice(0, count);
}