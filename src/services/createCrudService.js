import { supabase } from './supabaseClient';

/**
 * Cria um serviço CRUD reutilizável para uma tabela do Supabase.
 * @param {string} table - nome da tabela
 * @param {string} orderBy - coluna usada para ordenação padrão
 */
export function createCrudService(table, orderBy = 'created_at') {
  return {
    async list({ limit = 50, ascending = false, filters = {} } = {}) {
      let query = supabase.from(table).select('*').order(orderBy, { ascending }).limit(limit);
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    async getById(id) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },

    async create(payload) {
      const { data, error } = await supabase.from(table).insert(payload).select().single();
      if (error) throw error;
      return data;
    },

    async update(id, payload) {
      const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },

    async remove(id) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return true;
    },
  };
}
