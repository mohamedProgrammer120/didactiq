"use client";

import { useState } from "react";
import { X, Sparkles, LayoutTemplate } from "lucide-react";
import type { Course, MindMap } from "@/lib/types";
import { generateGabaritMindMap } from "@/lib/mindmap";

interface Props {
  course: Course | null;
  open: boolean;
  onClose: () => void;
}

export function MindMapModal({ course, open, onClose }: Props) {
  const [mindMap, setMindMap] = useState<MindMap | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open || !course) return null;

  function handleGabarit() {
    setLoading(true);
    setTimeout(() => {
      const mm = generateGabaritMindMap(course!);
      setMindMap(mm);
      setLoading(false);
    }, 600);
  }

  function handleClose() {
    setMindMap(null);
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} aria-hidden />
      <div role="dialog" aria-modal="true" className="relative w-full max-w-lg bg-surface border border-border rounded-xl shadow-pop p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Carte mentale didactique</h2>
          <button onClick={handleClose} className="btn-ghost btn-sm w-8" aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-text-muted mb-1">Cours sélectionné</p>
        <p className="font-medium mb-5">{course.titleFr}</p>

        {!mindMap && !loading && (
          <div className="space-y-3">
            <p className="text-sm text-text-muted mb-3">Choisissez le moteur de génération :</p>

            <button
              onClick={handleGabarit}
              className="w-full flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-surface-hover transition-colors text-left"
            >
              <LayoutTemplate className="w-6 h-6 text-success shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Gabarit didactique</div>
                <div className="text-sm text-text-muted">
                  Génération instantanée et 100 % locale selon le plan officiel (Ouverture → Modélisation → Pratique → Clôture).
                </div>
              </div>
            </button>

            <button disabled className="w-full flex items-start gap-3 p-4 rounded-lg border border-border opacity-50 cursor-not-allowed text-left">
              <Sparkles className="w-6 h-6 text-purple shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Gemini AI Vision</div>
                <div className="text-sm text-text-muted">Disponible bientôt (nécessite une clé API).</div>
              </div>
            </button>
          </div>
        )}

        {loading && (
          <div className="py-10 text-center text-text-muted">
            <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
            <p>Génération de la carte mentale…</p>
          </div>
        )}

        {mindMap && (
          <div className="space-y-4">
            {mindMap.stages.map((stage, i) => (
              <div key={stage.name} className="p-3 rounded-lg border border-border bg-bg">
                <div className="text-xs font-semibold text-accent mb-1">{i + 1}. {stage.name}</div>
                <p className="text-sm leading-relaxed">{stage.content}</p>
              </div>
            ))}

            <div className="p-3 rounded-lg border border-success/30 bg-success-muted/20">
              <div className="text-xs font-semibold text-success mb-2">Objectifs</div>
              <ul className="text-sm space-y-1">
                {mindMap.objectives.map((o) => (
                  <li key={o}>• {o}</li>
                ))}
              </ul>
            </div>

            <button onClick={handleClose} className="btn-primary btn-md w-full">Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}
