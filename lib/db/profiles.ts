import { createClient } from "@/lib/supabase/server";
import type { TeacherProfile, EducationLevel, Pole, UiLang, UiTheme } from "@/lib/types";

export async function getProfile(userId: string): Promise<TeacherProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error || !data) return null;

  return {
    level: data.level as EducationLevel | null,
    pole: data.pole as Pole | null,
    focusActive: data.focus_active ?? true,
    uiLang: (data.ui_lang as UiLang) ?? "fr",
    theme: (data.theme as UiTheme) ?? "dark",
  };
}

export async function upsertProfile(userId: string, profile: Partial<TeacherProfile>) {
  const supabase = await createClient();

  const payload: Record<string, unknown> = {
    id: userId,
    updated_at: new Date().toISOString(),
  };

  if (profile.level !== undefined) payload.level = profile.level;
  if (profile.pole !== undefined) payload.pole = profile.pole;
  if (profile.focusActive !== undefined) payload.focus_active = profile.focusActive;
  if (profile.uiLang !== undefined) payload.ui_lang = profile.uiLang;
  if (profile.theme !== undefined) payload.theme = profile.theme;

  const { error } = await supabase.from("profiles").upsert(payload);
  if (error) throw error;
}
