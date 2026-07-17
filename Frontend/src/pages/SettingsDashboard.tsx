import React, { useState } from "react";
import { Shield, Eye, Bell, Monitor, User, ChevronRight } from "lucide-react";

export const SettingsDashboard: React.FC = () => {
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [privateAccount, setPrivateAccount] = useState<boolean>(false);

  return (
    <div className="w-full text-text-primary bg-bg-primary">
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border-primary bg-bg-primary/80 px-4 backdrop-blur-md">
        <h1 className="text-lg font-bold tracking-tight">Settings</h1>
      </header>

      <div className="max-w-2xl divide-y divide-border-primary pb-20 md:pb-0">
        {/* Account Settings Category */}
        <div className="p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Account Management
          </h2>

          <div className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-secondary/40 p-3.5 cursor-pointer hover:bg-bg-secondary transition">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-accent-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  Personal Information
                </span>
                <span className="text-xs text-text-muted">
                  Update email, phone, and verification states.
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </div>
        </div>

        {/* Security & Privacy Category */}
        <div className="p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Security & Privacy
          </h2>

          {/* Account Privacy Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-secondary/40 p-3.5">
            <div className="flex items-center gap-3">
              <Eye className="h-4 w-4 text-indigo-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Private Account</span>
                <span className="text-xs text-text-muted">
                  Only approved users can discover your post arrays.
                </span>
              </div>
            </div>
            <button
              onClick={() => setPrivateAccount(!privateAccount)}
              className={`relative h-5 w-9 rounded-full transition-colors duration-200 outline-none ${
                privateAccount ? "bg-accent-primary" : "bg-bg-secondary"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-bg-primary transition-transform duration-200 ${
                  privateAccount ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-secondary/40 p-3.5 cursor-pointer hover:bg-bg-secondary transition">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-success" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  Two-Factor Authentication
                </span>
                <span className="text-xs text-text-muted">
                  Inject security keys or cryptographic configurations.
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </div>
        </div>

        {/* Preferences Category */}
        <div className="p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Preferences
          </h2>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-secondary/40 p-3.5">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-rose-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Push Notifications</span>
                <span className="text-xs text-text-muted">
                  Receive live alerts on desktop and peripheral pipelines.
                </span>
              </div>
            </div>
            <button
              onClick={() => setPushEnabled(!pushEnabled)}
              className={`relative h-5 w-9 rounded-full transition-colors duration-200 outline-none ${
                pushEnabled ? "bg-accent-primary" : "bg-bg-secondary"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-bg-primary transition-transform duration-200 ${
                  pushEnabled ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-secondary/40 p-3.5 cursor-pointer hover:bg-bg-secondary transition">
            <div className="flex items-center gap-3">
              <Monitor className="h-4 w-4 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Display & Haptics</span>
                <span className="text-xs text-text-muted">
                  Switch dynamic scaling layers and grid alignments.
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
