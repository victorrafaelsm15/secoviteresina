import { eventsService } from '../../services';

export const eventsConfig = {
  title: 'Eventos',
  service: eventsService,
  folder: 'events',
  listOptions: { limit: 100, ascending: true },
  columns: [
    { key: 'title', label: 'Título' },
    {
      key: 'event_date',
      label: 'Data',
      render: (item) => (item.event_date ? new Date(item.event_date).toLocaleString('pt-BR') : '—'),
    },
    { key: 'location', label: 'Local' },
  ],
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    { name: 'event_date', label: 'Data e hora', type: 'datetime', required: true },
    { name: 'location', label: 'Local', type: 'text' },
    { name: 'description', label: 'Descrição', type: 'textarea' },
  ],
};
