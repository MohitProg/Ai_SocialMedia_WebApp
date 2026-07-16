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
      className={`flex w-full items-center gap-3 border-b border-slate-900/60 px-4 py-3.5 text-left transition-all hover:bg-slate-900/40 ${
        isActive
          ? "bg-slate-800/40 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-cyan-500"
          : ""
      }`}
    >
      {/* Avatar Container with Active Indicator Pip */}
      <div className="relative shrink-0">
        <img
          src={participant.avatarUrl}
          alt={participant.displayName}
          className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-800"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0B0F19] bg-emerald-500" />
        )}
      </div>

      {/* Narrative Metadata Meta Column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-semibold text-slate-200">
            {participant.displayName}
          </span>
          {lastMessage && (
            <span className="text-[11px] text-slate-500">
              {lastMessage.timestamp}
            </span>
          )}
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          {lastMessage ? (
            <p
              className={`truncate text-xs ${unreadCount > 0 ? "font-medium text-slate-200" : "text-slate-500"}`}
            >
              {lastMessage.content}
            </p>
          ) : (
            <p className="italic text-xs text-slate-600">No messages yet</p>
          )}

          {/* Message Status Icons or Unread Badge Counter */}
          {unreadCount > 0 ? (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950">
              {unreadCount}
            </span>
          ) : (
            lastMessage &&
            lastMessage.senderId === "me" && (
              <span className="text-cyan-500">
                {lastMessage.status === "read" ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5 text-slate-600" />
                )}
              </span>
            )
          )}
        </div>
      </div>
    </button>
  );
};
