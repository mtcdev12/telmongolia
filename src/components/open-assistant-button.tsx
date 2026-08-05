"use client";

import { MessageCircle } from "lucide-react";

export default function OpenAssistantButton({
  children = "Ask the assistant",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("telecom-chat-open"))}
      className={className}
    >
      <MessageCircle size={18} />
      {children}
    </button>
  );
}
