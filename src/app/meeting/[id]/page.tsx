import { Metadata } from "next";
import MeetingPage from "./MeetingPage";
import { currentUser } from "@clerk/nextjs/server";
import MeetingLoginPage from "./MeetingLoginPage";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ guest?: string }>;

interface PageProps {
    params: Params;
    searchParams: SearchParams;
}

// Generate Metadata
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `Meeting ${id}`,
    };
}

// Main Page Component
export default async function Page({
    params,
    searchParams
}: PageProps) {
    const { id } = await params;
    const guestParams = await searchParams;
    const guest = guestParams.guest;
    const user = await currentUser();

    const guestMode = guest === "true";

    if (!user && !guestMode) {
        return <MeetingLoginPage />;
    }

    return <MeetingPage id={id} />;
}
