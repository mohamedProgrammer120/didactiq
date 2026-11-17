-- Seed data for Didactiq (development only)
insert into courses (id, slug, level, subject, week, day, title_fr, title_ar, topic, slides_count, is_published, sort_order)
values
  ('a0000000-0000-4000-8000-000000000001', '1aef-fr-w1-d1-sons-a', '1AEF', 'francais', 1, 1, 'Les sons de la lettre A', 'أصوات حرف الألف', 'Phonologie', 8, true, 10),
  ('a0000000-0000-4000-8000-000000000002', '1aef-math-w1-d1-compter', '1AEF', 'maths', 1, 1, 'Compter jusqu''à 10', 'العد حتى 10', 'Nombres', 10, true, 20),
  ('a0000000-0000-4000-8000-000000000003', '2aef-fr-w1-d1-phrase', '2AEF', 'francais', 1, 1, 'La phrase affirmative', 'الجملة الإثباتية', 'Syntaxe', 9, true, 30),
  ('a0000000-0000-4000-8000-000000000004', '3aef-sci-w1-d2-plante', '3AEF', 'sciences', 1, 2, 'Les parties de la plante', 'أجزاء النبات', 'Sciences de la vie', 12, true, 40),
  ('a0000000-0000-4000-8000-000000000005', '4aef-math-w1-d2-fractions', '4AEF', 'maths', 1, 2, 'Les fractions simples', 'الكسور البسيطة', 'Nombres rationnels', 11, true, 50),
  ('a0000000-0000-4000-8000-000000000006', '5aef-ar-w1-d3-dual', '5AEF', 'arabe', 1, 3, 'Le dual et le pluriel', 'المثنى والجمع', 'Grammaire', 10, true, 60),
  ('a0000000-0000-4000-8000-000000000007', '6aef-fr-w1-d3-passe', '6AEF', 'francais', 1, 3, 'Le passé composé', 'الماضي المركب', 'Conjugaison', 14, true, 70),
  ('a0000000-0000-4000-8000-000000000008', '3aef-ar-w1-d1-lettres', '3AEF', 'arabe', 1, 1, 'Les lettres solaires et lunaires', 'الحروف الشمسية والقمرية', 'Phonétique', 8, true, 80)
on conflict (id) do nothing;
