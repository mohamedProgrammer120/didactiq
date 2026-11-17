"use client";

import type { TeacherProfile, EducationLevel, Pole, UiLang, UiTheme } from "./types";

const KEY = "didactiq-profile";

const DEFAULT: TeacherProfile = {
  level: null,
  pole: null,
  focusActive: true,
  uiLang: "fr",
  theme: "dark",
};

export function loadProfile(): TeacherProfile {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveProfile(p: Partial<TeacherProfile>) {
  const current = loadProfile();
  const next = { ...current, ...p };
  localStorage.setItem(KEY, JSON.stringify(next));

  if (p.theme) {
    document.documentElement.classList.toggle("theme-light", p.theme === "light");
    localStorage.setItem("didactiq-theme", p.theme);
  }

  if (p.uiLang) {
    document.documentElement.lang = p.uiLang;
    document.documentElement.dir = p.uiLang === "ar" ? "rtl" : "ltr";
  }

  return next;
}

export function hasProfile(p: TeacherProfile) {
  return p.level !== null && p.pole !== null;
}
