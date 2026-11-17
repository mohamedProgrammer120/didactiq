import type { Course, MindMap, MindMapStage } from "./types";

export function generateGabaritMindMap(course: Course): MindMap {
  const title = course.titleFr;

  const stages: MindMapStage[] = [
    {
      name: "Ouverture",
      content: `Activer les connaissances antérieures liées à « ${title} ». Présenter l'objectif de la séance de façon claire et motivante.`,
    },
    {
      name: "Modélisation (Je fais)",
      content: `L'enseignant démontre explicitement la procédure ou le concept de « ${title} » en pensant à voix haute. Montrer chaque étape.`,
    },
    {
      name: "Pratique guidée (Nous faisons)",
      content: `Les élèves pratiquent avec le soutien de l'enseignant. Feedback immédiat, correction des erreurs, renforcement positif.`,
    },
    {
      name: "Clôture & autonomie (Vous faites)",
      content: `Synthèse collective. Les élèves reformulent l'objectif et s'exercent de façon autonome. Préparation du transfert.`,
    },
  ];

  const objectives = [
    `Comprendre le concept central de « ${title} »`,
    "Appliquer la procédure de façon guidée puis autonome",
    "Verbaliser les étapes clés de la démarche",
  ];

  return {
    courseId: course.id,
    engine: "gabarit",
    stages,
    objectives,
  };
}

export function mindMapToText(mm: MindMap, courseTitle: string): string {
  const lines = [
    `CARTE MENTALE DIDACTIQUE`,
    `────────────────────────`,
    courseTitle,
    ``,
    ...mm.stages.map((s, i) => `${i + 1}. ${s.name.toUpperCase()}\n   ${s.content}\n`),
    `OBJECTIFS`,
    ...mm.objectives.map((o) => `• ${o}`),
  ];
  return lines.join("\n");
}
