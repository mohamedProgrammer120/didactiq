"use client";

import { Moon, Sun, User, BookOpen, Bell } from "lucide-react";
import { loadProfile, saveProfile } from "@/lib/profile";
import { useEffect, useState } from "react";
import type { TeacherProfile } from "@/lib/types";

interface Props {
  onOpenProfile: () => void;
}

export function Topbar({ onOpenProfile }: Props) {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  function toggleTheme() {
    if (!profile) return;
    const next = profile.theme === "dark" ? "light" : "dark";
    const updated = saveProfile({ theme: next });
    setProfile(updated);
  }

  function toggleLang() {
    if (!profile) return;
    const next = profile.uiLang === "fr" ? "ar" : "fr";
    const updated = saveProfile({ uiLang: next });
    setProfile(updated);
  }

  return (
    <header className="sticky top-0 z-40 h-header border-b border-border bg-bg/95 backdrop-blur flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-accent" />
        <span className="font-bold text-lg tracking-tight">Didactiq</span>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={toggleLang} className="btn-ghost btn-sm rounded-pill px-3" aria-label="Changer de langue">
          {profile?.uiLang === "ar" ? "🇫🇷 FR" : "🇲🇦 AR"}
        </button>

        <button onClick={toggleTheme} className="btn-ghost btn-sm w-10" aria-label="Changer de thème">
          {profile?.theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="btn-ghost btn-sm w-10" aria-label="Alertes">
          <Bell className="w-5 h-5" />
        </button>

        <button onClick={onOpenProfile} className="btn-secondary btn-sm gap-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Mon profil</span>
        </button>
      </div>
    </header>
  );
}
