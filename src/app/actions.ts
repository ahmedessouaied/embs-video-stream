"use server"

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export async function getToken() {
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
    const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;

    if(!streamApiKey || !streamApiSecret) {
        throw new Error("Stream API key or secret no set");
    }

    const user = await currentUser();
    console.log("Generating token for user: ", user?.id);
    if(!user) {
        throw new Error("User not authenticated");
    }
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    
    const streamClient = new StreamClient(streamApiKey, streamApiSecret);
    const token = streamClient.generateUserToken({
        user_id: user?.id,
        validity_in_seconds:expirationTime,
    })

    console.log("Succssfully generated token: ", token);
    return token;
}

export async function getUserIds(emailAddresses: string[]) {
    const clerk = await clerkClient();
    const response = await clerk.users.getUserList({
        emailAddress: emailAddresses,
    })
    const users = response.data;
    return users.map((user) => user.id);
}