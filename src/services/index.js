import { createCrudService } from './createCrudService';

export const eventsService = createCrudService('events', 'event_date');
export const documentsService = createCrudService('documents', 'created_at');
export const partnersService = createCrudService('partners', 'created_at');
export const boardService = createCrudService('board_members', 'display_order');
export const bannersService = createCrudService('banners', 'display_order');

export * from './newsService';
export { supabase } from './supabaseClient';
