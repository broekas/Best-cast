import { NeynarAPIClient } from '@neynar/nodejs-sdk';
const apiKey = process.env.NEYNAR_API_KEY!;
export const neynarClient = new NeynarAPIClient(apiKey);