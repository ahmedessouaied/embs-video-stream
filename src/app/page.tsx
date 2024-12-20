import { Metadata } from "next"
import CreateMeetingPage from "@/components/CreateMeetingPage"
export const metadata: Metadata = {
  title: "Doctor Dashboard - Bipolar Disorder Management",
  description: "Manage and monitor patients with bipolar disorder",
}

export default function DashboardPage() {
  return <CreateMeetingPage />
}

