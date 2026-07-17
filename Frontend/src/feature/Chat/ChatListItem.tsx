import React from "react";
import { Check, CheckCheck } from "lucide-react";
import type { ChatSession } from "../../types";

interface ChatListItemProps {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  session,
  isActive,
  onClick,
}) => {
  const { participant, lastMessage, unreadCount, isOnline } = session;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-border-primary px-4 py-3.5 text-left transition-all hover:bg-bg-secondary ${
        isActive
          ? "bg-bg-secondary/60 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-accent-primary"
          : ""
      }`}
    >
      {/* Avatar Container with Active Indicator Pip */}
      <div className="relative shrink-0">
        <img
          src={participant.avatarUrl}
          alt={participant.displayName}
          className="h-11 w-11 rounded-full object-cover ring-1 ring-border-primary"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bg-primary bg-success" />
        )}
      </div>

      {/* Narrative Metadata Meta Column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-semibold text-text-primary">
            {participant.displayName}
          </span>
          {lastMessage && (
            <span className="text-[11px] text-text-muted">
              {lastMessage.timestamp}
            </span>
          )}
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          {lastMessage ? (
            <p
              className={`truncate text-xs ${unreadCount > 0 ? "font-medium text-text-primary" : "text-text-muted"}`}
            >
              {lastMessage.content}
            </p>
          ) : (
            <p className="italic text-xs text-text-muted/60">No messages yet</p>
          )}

          {/* Message Status Icons or Unread Badge Counter */}
          {unreadCount > 0 ? (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-primary px-1 text-[10px] font-bold text-bg-primary">
              {unreadCount}
            </span>
          ) : (
            lastMessage &&
            lastMessage.senderId === "me" && (
              <span className="text-accent-primary">
                {lastMessage.status === "read" ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5 text-text-muted" />
                )}
              </span>
            )
          )}
        </div>
      </div>
    </button>
  );
};
