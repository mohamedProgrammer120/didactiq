import { createClient } from "@/lib/supabase/server";
import type { Course, EducationLevel, Subject } from "@/lib/types";

function mapCourse(row: any): Course {
  return {
    id: row.id,
    level: row.level,
    subject: row.subject,
    week: row.week,
    day: row.day,
    titleFr: row.title_fr,
    titleAr: row.title_ar ?? "",
    topic: row.topic ?? undefined,
    slidesCount: row.slides_count ?? 0,
    isMultilevel: row.is_multilevel ?? false,
    multilevelGroup: row.multilevel_group ?? undefined,
  };
}

export async function listCourses(filters?: {
  week?: number;
  day?: number;
  level?: EducationLevel;
  subject?: Subject;
}): Promise<Course[]> {
  const supabase = await createClient();

  let query = supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
    .order("day");

  if (filters?.week) query = query.eq("week", filters.week);
  if (filters?.day) query = query.eq("day", filters.day);
  if (filters?.level) query = query.eq("level", filters.level);
  if (filters?.subject) query = query.eq("subject", filters.subject);

  const { data, error } = await query;
  if (error) {
    console.error("listCourses", error);
    return [];
  }
  return (data ?? []).map(mapCourse);
}

export async function getCourse(id: string): Promise<Course | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapCourse(data);
}
