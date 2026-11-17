export type EducationLevel = "1AEF" | "2AEF" | "3AEF" | "4AEF" | "5AEF" | "6AEF";
export type Subject = "francais" | "maths" | "sciences" | "arabe";
export type Pole = "francais" | "arabe";
export type UiLang = "fr" | "ar";
export type UiTheme = "dark" | "light";

export interface TeacherProfile {
  level: EducationLevel | null;
  pole: Pole | null;
  focusActive: boolean;
  uiLang: UiLang;
  theme: UiTheme;
}

export interface Course {
  id: string;
  level: EducationLevel;
  subject: Subject;
  week: number;
  day: number;
  titleFr: string;
  titleAr: string;
  topic?: string;
  slidesCount: number;
  isMultilevel?: boolean;
  multilevelGroup?: string;
}

export interface MindMapStage {
  name: string;
  content: string;
}

export interface MindMap {
  courseId: string;
  engine: "gabarit" | "gemini";
  stages: MindMapStage[];
  objectives: string[];
}
