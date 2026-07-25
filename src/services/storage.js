import { supabase } from './supabaseClient';

const BUCKET = 'portal-media';

/**
 * Envia um arquivo para o bucket portal-media e retorna a URL pública.
 * @param {string} folder - subpasta da entidade (ex: 'news', 'partners')
 * @param {File} file
 */
export async function uploadMedia(folder, file) {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
