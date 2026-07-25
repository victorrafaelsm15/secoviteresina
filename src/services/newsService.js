import { supabase } from './supabaseClient';

const TABLE = 'news';

export async function listNews({ limit = 6, category = null } = {}) {
  let query = supabase
    .from(TABLE)
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getNewsById(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createNews(payload) {
  const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateNews(id, payload) {
  const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteNews(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return true;
}
