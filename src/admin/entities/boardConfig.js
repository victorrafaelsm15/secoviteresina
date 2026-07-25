import { boardService } from '../../services';

export const boardConfig = {
  title: 'Diretoria',
  service: boardService,
  folder: 'board',
  listOptions: { limit: 100, ascending: true },
  columns: [
    { key: 'name', label: 'Nome' },
    { key: 'role', label: 'Cargo' },
    { key: 'display_order', label: 'Ordem' },
  ],
  fields: [
    { name: 'name', label: 'Nome', type: 'text', required: true },
    { name: 'role', label: 'Cargo', type: 'text', required: true },
    { name: 'description', label: 'Descrição', type: 'textarea' },
    { name: 'photo_url', label: 'Foto', type: 'image' },
    { name: 'display_order', label: 'Ordem de exibição', type: 'number' },
  ],
};
