import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Image,
  Smile,
  Phone,
  Video,
  Info,
  Paperclip,
} from "lucide-react";
import type { ChatSession, Message, User } from "../types";
import { ChatListItem } from "../feature/Chat/ChatListItem";

// Concrete Seed Data Models
const TARGET_USER: User = {
  id: "u2",
  username: "design_by_mia",
  displayName: "Mia Roberts",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  joinDate: "2022",
  followersCount: 8430,
  followingCount: 120,
};

const INITIAL_SESSIONS: ChatSession[] = [
  {
    id: "s1",
    participant: TARGET_USER,
    isOnline: true,
    unreadCount: 0,
    lastMessage: {
      id: "m2",
      senderId: "u2",
      receiverId: "me",
      content:
        "Let me know what you think of those dark mode mockups whenever you get a minute!",
      timestamp: "11:20 PM",
      status: "read",
    },
  },
  {
    id: "s2",
    participant: {
      id: "u1",
      username: "alex_dev",
      displayName: "Alex Chen",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      joinDate: "2023",
      followersCount: 1205,
      followingCount: 340,
    },
    isOnline: false,
    unreadCount: 2,
    lastMessage: {
      id: "m1",
      senderId: "u1",
      receiverId: "me",
      content: "Can you review this pull request?",
      timestamp: "Yesterday",
      status: "delivered",
    },
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg_1",
    senderId: "me",
    receiverId: "u2",
    content:
      "Hey Mia! Just went through the layout design system docs you uploaded earlier.",
    timestamp: "11:15 PM",
    status: "read",
  },
  {
    id: "msg_2",
    senderId: "u2",
    receiverId: "me",
    content:
      "Awesome! Did the neon color saturation values map correctly to your components?",
    timestamp: "11:18 PM",
    status: "read",
  },
  {
    id: "msg_3",
    senderId: "me",
    receiverId: "u2",
    content:
      "Yeah, they look completely sharp. Take a look at this rendering pass.",
    mediaUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    mediaType: "image",
    timestamp: "11:19 PM",
    status: "read",
  },
  {
    id: "msg_4",
    senderId: "u2",
    receiverId: "me",
    content:
      "Let me know what you think of those dark mode mockups whenever you get a minute!",
    timestamp: "11:20 PM",
    status: "read",
  },
];

export const ChatInterface: React.FC = () => {
  const [sessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(
    sessions[0],
  );
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping] = useState<boolean>(true); // Controlled toggle state to show layout handling

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSession) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: "me",
      receiverId: activeSession.participant.id,
      content: inputText,
      timestamp: "11:25 PM",
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  return (
<div className="grid h-[calc(100vh-4rem)] md:h-screen grid-cols-1 md:grid-cols-3 xl:grid-cols-4 bg-bg-primary">
      {/* Column 1: Master Sessions Index Feed */}
      <div
        className={`flex flex-col border-r border-border-primary ${activeSession ? "hidden md:flex" : "flex"} md:col-span-1`}
      >
        <div className="p-4 border-b border-border-primary">
          <h1 className="text-lg font-bold text-text-primary tracking-tight">
            Messages
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.map((session) => (
            <ChatListItem
              key={session.id}
              session={session}
              isActive={activeSession?.id === session.id}
              onClick={() => setActiveSession(session)}
            />
          ))}
        </div>
      </div>

      {/* Column 2 & 3: Interactive Detail Viewport Feed */}
      <div
        className={`flex flex-col md:col-span-2 xl:col-span-3 ${!activeSession ? "hidden md:flex" : "flex"}`}
      >
        {activeSession ? (
          <>
            {/* Thread Header Toolbar */}
            <header className="flex h-14 items-center justify-between border-b border-border-primary bg-bg-primary/80 px-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveSession(null)}
                  className="text-xs text-text-muted hover:text-text-secondary md:hidden"
                >
                  Back
                </button>
                <div className="relative">
                  <img
                    src={activeSession.participant.avatarUrl}
                    alt={activeSession.participant.displayName}
                    className="h-9 w-9 rounded-full object-cover border border-border-primary"
                  />
                  {activeSession.isOnline && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-bg-primary bg-success" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text-primary leading-tight">
                    {activeSession.participant.displayName}
                  </h2>
                  <p className="text-[10px] text-text-muted">
                    {activeSession.isOnline ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-text-muted">
                <button className="hover:text-accent-primary transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="hover:text-accent-primary transition-colors">
                  <Video className="h-4 w-4" />
                </button>
                <button className="hover:text-accent-primary transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Scrollable Message History Window */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isMe = msg.senderId === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[75%] flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      {/* Integrated Bubble Component Frame */}
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isMe
                            ? "bg-gradient-to-r from-accent-primary to-indigo-600 text-bg-primary font-medium"
                            : "bg-bg-secondary border border-border-primary text-text-secondary"
                        }`}
                      >
                        {msg.content}

                        {/* Direct Media Shared Image Node Embed */}
                        {msg.mediaUrl && (
                          <div className="mt-2 overflow-hidden rounded-xl border border-border-primary max-w-xs">
                            <img
                              src={msg.mediaUrl}
                              alt="Shared content visual payload"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Timestamp Subtitle metadata label */}
                      <span className="mt-1 text-[9px] text-text-muted px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Animation Pipeline State Mock Render */}
              {isTyping && (
                <div className="flex items-center gap-2 text-text-muted text-xs italic px-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-border-primary" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-border-primary [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-border-primary [animation-delay:0.4s]" />
                  <span>
                    {activeSession.participant.displayName} is typing...
                  </span>
                </div>
              )}
            </div>

            {/* Input Action Bottom Form Layer */}
            <footer className="p-4 border-t border-border-primary bg-bg-primary">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-1.5 text-text-muted">
                  <button
                    type="button"
                    className="rounded-full p-2 hover:bg-bg-secondary hover:text-accent-primary transition-colors"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 hover:bg-bg-secondary hover:text-accent-primary transition-colors"
                  >
                    <Image className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 hover:bg-bg-secondary hover:text-accent-primary transition-colors"
                  >
                    <Smile className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message ${activeSession.participant.displayName}...`}
                  className="flex-1 rounded-xl border border-border-secondary bg-bg-secondary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-border-focus transition"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="rounded-xl bg-accent-primary p-2.5 text-bg-primary transition hover:opacity-90 disabled:bg-bg-tertiary disabled:text-text-muted"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-sm text-text-muted">
            <span>
              Select a conversation thread index from the panel to begin chatting.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
