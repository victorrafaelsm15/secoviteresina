import {
  listNews, createNews, updateNews, deleteNews,
} from '../../services/newsService';

const service = {
  list: (opts) => listNews({ limit: opts?.limit ?? 100 }),
  create: createNews,
  update: updateNews,
  remove: deleteNews,
};

export const newsConfig = {
  title: 'Notícias',
  service,
  folder: 'news',
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'category', label: 'Categoria' },
    {
      key: 'published_at',
      label: 'Publicado em',
      render: (item) => (item.published_at ? new Date(item.published_at).toLocaleDateString('pt-BR') : '—'),
    },
  ],
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'category', label: 'Categoria', type: 'text' },
    { name: 'excerpt', label: 'Resumo', type: 'textarea' },
    { name: 'content', label: 'Conteúdo completo', type: 'textarea' },
    { name: 'image_url', label: 'Imagem de capa', type: 'image' },
    { name: 'published_at', label: 'Data de publicação', type: 'date', required: true },
  ],
};
