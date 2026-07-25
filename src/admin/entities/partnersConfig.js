import { partnersService } from '../../services';

export const partnersConfig = {
  title: 'Parceiros',
  service: partnersService,
  folder: 'partners',
  listOptions: { limit: 100, ascending: true },
  columns: [
    { key: 'name', label: 'Nome' },
    { key: 'display_order', label: 'Ordem' },
  ],
  fields: [
    { name: 'name', label: 'Nome do parceiro', type: 'text', required: true },
    { name: 'logo_url', label: 'Logo', type: 'image' },
    { name: 'website_url', label: 'Site (link)', type: 'text' },
    { name: 'display_order', label: 'Ordem de exibição', type: 'number' },
  ],
};
