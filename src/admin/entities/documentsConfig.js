import { documentsService } from '../../services';
import { documentCategories } from '../../services/siteContent';

export const documentsConfig = {
  title: 'Documentos',
  service: documentsService,
  folder: 'documents',
  columns: [
    { key: 'title', label: 'Título' },
    {
      key: 'category',
      label: 'Categoria',
      render: (item) => documentCategories.find((c) => c.value === item.category)?.label ?? item.category,
    },
    {
      key: 'created_at',
      label: 'Adicionado em',
      render: (item) => (item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : '—'),
    },
  ],
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'category', label: 'Categoria', type: 'select', options: documentCategories, required: true,
    },
    {
      name: 'file_url', label: 'Arquivo (PDF)', type: 'file', required: true,
    },
  ],
};
