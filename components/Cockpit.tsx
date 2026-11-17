"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Course } from "@/lib/types";

interface Props {
  course: Course | null;
  open: boolean;
  onClose: () => void;
}

export function Cockpit({ course, open, onClose }: Props) {
  const [slide, setSlide] = useState(0);

  if (!open || !course) return null;

  const total = course.slidesCount;
  const canPrev = slide > 0;
  const canNext = slide < total - 1;

  return (
    <div className="fixed inset-0 z-50 bg-bg flex flex-col">
      <div className="h-12 flex items-center justify-between px-4 border-b border-border bg-surface">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onClose} className="btn-ghost btn-sm w-8" aria-label="Quitter">
            <X className="w-5 h-5" />
          </button>
          <span className="font-medium truncate">{course.titleFr}</span>
        </div>
        <div className="text-sm text-text-muted tabular-nums">{slide + 1} / {total}</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl aspect-video bg-surface border border-border rounded-xl shadow-pop flex flex-col items-center justify-center text-center p-8">
          <div className="text-6xl font-bold text-accent mb-4">{slide + 1}</div>
          <h2 className="text-2xl font-semibold mb-2">{course.titleFr}</h2>
          <p className="text-text-muted">
            Diapositive de démonstration — le contenu réel sera chargé depuis le stockage.
          </p>
          {course.topic && <p className="mt-4 text-sm text-text-faint">{course.topic}</p>}
        </div>
      </div>

      <div className="h-16 flex items-center justify-center gap-4 border-t border-border bg-surface">
        <button onClick={() => canPrev && setSlide((s) => s - 1)} disabled={!canPrev} className="btn-secondary btn-md" aria-label="Précédent">
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </button>
        <button onClick={() => canNext && setSlide((s) => s + 1)} disabled={!canNext} className="btn-primary btn-md" aria-label="Suivant">
          Suivant
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
