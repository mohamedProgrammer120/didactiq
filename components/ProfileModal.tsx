"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { EducationLevel, Pole, TeacherProfile } from "@/lib/types";
import { loadProfile, saveProfile } from "@/lib/profile";
import { LEVEL_LABELS } from "@/data/courses";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: (p: TeacherProfile) => void;
}

const LEVELS: EducationLevel[] = ["1AEF", "2AEF", "3AEF", "4AEF", "5AEF", "6AEF"];

export function ProfileModal({ open, onClose, onSaved }: Props) {
  const [level, setLevel] = useState<EducationLevel | null>(null);
  const [pole, setPole] = useState<Pole | null>(null);

  useEffect(() => {
    if (open) {
      const p = loadProfile();
      setLevel(p.level);
      setPole(p.pole);
    }
  }, [open]);

  if (!open) return null;

  function handleSave() {
    const updated = saveProfile({ level, pole, focusActive: true });
    onSaved(updated);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-labelledby="profile-title" className="relative w-full max-w-md bg-surface border border-border rounded-xl shadow-pop p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 id="profile-title" className="text-lg font-bold">Profil enseignant</h2>
          <button onClick={onClose} className="btn-ghost btn-sm w-8" aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-text-muted text-sm mb-4">
          Indiquez votre niveau et votre pôle pour afficher en priorité vos séances.
        </p>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Niveau</label>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-md border px-2 py-2 text-sm transition-colors ${
                  level === l ? "border-accent bg-accent-muted text-accent" : "border-border hover:bg-surface-hover"
                }`}
              >
                {LEVEL_LABELS[l].emoji} {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Pôle</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPole("francais")}
              className={`rounded-md border px-3 py-3 text-sm transition-colors ${
                pole === "francais" ? "border-accent bg-accent-muted text-accent" : "border-border hover:bg-surface-hover"
              }`}
            >
              🇫🇷 Français
            </button>
            <button
              onClick={() => setPole("arabe")}
              className={`rounded-md border px-3 py-3 text-sm transition-colors ${
                pole === "arabe" ? "border-accent bg-accent-muted text-accent" : "border-border hover:bg-surface-hover"
              }`}
            >
              🇲🇦 Arabe
            </button>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="btn-secondary btn-md">Annuler</button>
          <button onClick={handleSave} disabled={!level || !pole} className="btn-primary btn-md">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
