import type { Course } from "@/lib/types";

export const SEED_COURSES: Course[] = [
  { id: "c1", level: "1AEF", subject: "francais", week: 1, day: 1, titleFr: "Les sons de la lettre A", titleAr: "أصوات حرف الألف", topic: "Phonologie", slidesCount: 8 },
  { id: "c2", level: "1AEF", subject: "maths", week: 1, day: 1, titleFr: "Compter jusqu'à 10", titleAr: "العد حتى 10", topic: "Nombres", slidesCount: 10 },
  { id: "c3", level: "2AEF", subject: "francais", week: 1, day: 1, titleFr: "La phrase affirmative", titleAr: "الجملة الإثباتية", topic: "Syntaxe", slidesCount: 9 },
  { id: "c4", level: "3AEF", subject: "sciences", week: 1, day: 2, titleFr: "Les parties de la plante", titleAr: "أجزاء النبات", topic: "Sciences de la vie", slidesCount: 12 },
  { id: "c5", level: "4AEF", subject: "maths", week: 1, day: 2, titleFr: "Les fractions simples", titleAr: "الكسور البسيطة", topic: "Nombres rationnels", slidesCount: 11 },
  { id: "c6", level: "5AEF", subject: "arabe", week: 1, day: 3, titleFr: "Le dual et le pluriel", titleAr: "المثنى والجمع", topic: "Grammaire", slidesCount: 10 },
  { id: "c7", level: "6AEF", subject: "francais", week: 1, day: 3, titleFr: "Le passé composé", titleAr: "الماضي المركب", topic: "Conjugaison", slidesCount: 14 },
  { id: "c8", level: "3AEF", subject: "arabe", week: 1, day: 1, titleFr: "Les lettres solaires et lunaires", titleAr: "الحروف الشمسية والقمرية", topic: "Phonétique", slidesCount: 8 },
];

export const SUBJECT_LABELS: Record<string, { fr: string; ar: string; emoji: string }> = {
  francais: { fr: "Français", ar: "الفرنسية", emoji: "🇫🇷" },
  maths: { fr: "Mathématiques", ar: "الرياضيات", emoji: "📐" },
  sciences: { fr: "Sciences", ar: "العلوم", emoji: "🔬" },
  arabe: { fr: "Arabe", ar: "العربية", emoji: "🇲🇦" },
};

export const LEVEL_LABELS: Record<string, { fr: string; ar: string; emoji: string }> = {
  "1AEF": { fr: "1ère A.P.", ar: "الأولى ابتدائي", emoji: "🌱" },
  "2AEF": { fr: "2ème A.P.", ar: "الثانية ابتدائي", emoji: "💧" },
  "3AEF": { fr: "3ème A.P.", ar: "الثالثة ابتدائي", emoji: "📘" },
  "4AEF": { fr: "4ème A.P.", ar: "الرابعة ابتدائي", emoji: "📗" },
  "5AEF": { fr: "5ème A.P.", ar: "الخامسة ابتدائي", emoji: "📙" },
  "6AEF": { fr: "6ème A.P.", ar: "السادسة ابتدائي", emoji: "🎓" },
};
