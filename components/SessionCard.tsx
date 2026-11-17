"use client";

import { Monitor, Map } from "lucide-react";
import type { Course } from "@/lib/types";
import { SUBJECT_LABELS, LEVEL_LABELS } from "@/data/courses";

interface Props {
  course: Course;
  onOpenCockpit: (c: Course) => void;
  onGenerateMindMap: (c: Course) => void;
}

export function SessionCard({ course, onOpenCockpit, onGenerateMindMap }: Props) {
  const subject = SUBJECT_LABELS[course.subject];
  const level = LEVEL_LABELS[course.level];

  return (
    <article className="bg-surface border border-border rounded-lg shadow-card overflow-hidden hover:bg-surface-hover transition-colors">
      <div className="h-1.5 bg-accent" />
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-pill bg-accent-muted text-accent">
            {level.emoji} {course.level}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-pill border border-border text-text-muted">
            {subject.emoji} {subject.fr}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-pill border border-border text-text-faint">
            {course.slidesCount} diapos
          </span>
        </div>

        <h3 className="font-semibold text-base leading-snug mb-1">{course.titleFr}</h3>
        {course.topic && <p className="text-sm text-text-muted mb-3">{course.topic}</p>}

        <div className="flex flex-wrap gap-2">
          <button onClick={() => onOpenCockpit(course)} className="btn-primary btn-sm">
            <Monitor className="w-4 h-4" />
            Cockpit
          </button>
          <button onClick={() => onGenerateMindMap(course)} className="btn-secondary btn-sm">
            <Map className="w-4 h-4" />
            Carte mentale
          </button>
        </div>
      </div>
    </article>
  );
}
