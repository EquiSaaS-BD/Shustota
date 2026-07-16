import { Messenger } from "@/components/messages/Messenger";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages - Shustota AI",
  description: "Chat with patients and staff.",
};

export default function MessagesPage() {
  return <Messenger />;
}
