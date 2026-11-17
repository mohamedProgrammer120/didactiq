"use client";

import { useEffect, useState, useMemo } from "react";
import { Topbar } from "@/components/Topbar";
import { ProfileModal } from "@/components/ProfileModal";
import { SessionCard } from "@/components/SessionCard";
import { MindMapModal } from "@/components/MindMapModal";
import { Cockpit } from "@/components/Cockpit";
import { SEED_COURSES, SUBJECT_LABELS } from "@/data/courses";
import { loadProfile, hasProfile } from "@/lib/profile";
import type { Course, TeacherProfile } from "@/lib/types";

export default function HomePage() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [mindMapOpen, setMindMapOpen] = useState(false);
  const [cockpitOpen, setCockpitOpen] = useState(false);
  const [day, setDay] = useState(1);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    if (!hasProfile(p)) {
      setProfileOpen(true);
    }
  }, []);

  const filtered = useMemo(() => {
    let list = SEED_COURSES.filter((c) => c.day === day);
    if (profile?.focusActive && profile.level) {
      list = [...list].sort((a, b) => {
        const aMatch = a.level === profile.level ? 0 : 1;
        const bMatch = b.level === profile.level ? 0 : 1;
        return aMatch - bMatch;
      });
    }
    return list;
  }, [day, profile]);

  const bySubject = useMemo(() => {
    const map: Record<string, Course[]> = {
      francais: [],
      maths: [],
      sciences: [],
      arabe: [],
    };
    for (const c of filtered) {
      map[c.subject]?.push(c);
    }
    return map;
  }, [filtered]);

  function handleOpenCockpit(c: Course) {
    setSelectedCourse(c);
    setCockpitOpen(true);
  }

  function handleGenerateMindMap(c: Course) {
    setSelectedCourse(c);
    setMindMapOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar onOpenProfile={() => setProfileOpen(true)} />

      <main className="flex-1 max-w-content mx-auto w-full px-4 py-6">
        {profile && !hasProfile(profile) && (
          <div className="mb-6 p-4 rounded-lg border border-accent/40 bg-accent-muted/30">
            <p className="font-medium mb-2">Bienvenue sur Didactiq</p>
            <p className="text-sm text-text-muted mb-3">
              Configurez votre niveau et votre pôle pour voir vos séances prioritaires.
            </p>
            <button onClick={() => setProfileOpen(true)} className="btn-primary btn-sm">
              Configurer mon profil
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setDay((d) => Math.max(1, d - 1))} className="btn-secondary btn-sm" disabled={day <= 1}>
            ◀
          </button>
          <span className="font-semibold tabular-nums">Jour {day}</span>
          <button onClick={() => setDay((d) => Math.min(7, d + 1))} className="btn-secondary btn-sm" disabled={day >= 7}>
            ▶
          </button>
          {profile?.level && (
            <span className="ms-auto text-sm text-text-muted">
              Focus : {profile.level} · {profile.pole === "francais" ? "Français" : "Arabe"}
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="text-lg mb-1">Aucune séance pour ce jour</p>
            <p className="text-sm">Changez de jour ou explorez le catalogue complet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {(["francais", "maths", "sciences", "arabe"] as const).map((subject) => {
              const courses = bySubject[subject];
              if (courses.length === 0) return null;
              const label = SUBJECT_LABELS[subject];
              return (
                <section key={subject}>
                  <h2 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
                    <span>{label.emoji}</span>
                    {label.fr}
                  </h2>
                  <div className="space-y-3">
                    {courses.map((c) => (
                      <SessionCard
                        key={c.id}
                        course={c}
                        onOpenCockpit={handleOpenCockpit}
                        onGenerateMindMap={handleGenerateMindMap}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} onSaved={setProfile} />
      <MindMapModal course={selectedCourse} open={mindMapOpen} onClose={() => setMindMapOpen(false)} />
      <Cockpit course={selectedCourse} open={cockpitOpen} onClose={() => setCockpitOpen(false)} />
    </div>
  );
}
