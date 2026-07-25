import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button, Table, ActionIcon, Modal, TextInput, Textarea, NumberInput, Select, Group, Text, Loader, Title,
} from '@mantine/core';
import { DateInput, DateTimePicker } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import MediaUploadField from './MediaUploadField';
import { uploadMedia } from '../../services/storage';
import styles from './CrudPage.module.css';

function defaultFieldValue(f) {
  if (f.type === 'date' || f.type === 'datetime') return null;
  return '';
}

function fieldValueFromItem(f, item) {
  const raw = item[f.name];
  if ((f.type === 'date' || f.type === 'datetime') && raw) return new Date(raw);
  return raw ?? defaultFieldValue(f);
}

function renderField(f, { register, control, errors }) {
  const requiredRule = f.required ? 'Campo obrigatório' : false;

  switch (f.type) {
    case 'textarea':
      return (
        <Textarea
          label={f.label}
          minRows={3}
          error={errors[f.name]?.message}
          {...register(f.name, { required: requiredRule })}
        />
      );
    case 'number':
      return (
        <Controller
          name={f.name}
          control={control}
          rules={{ required: requiredRule }}
          render={({ field }) => <NumberInput label={f.label} error={errors[f.name]?.message} {...field} />}
        />
      );
    case 'select':
      return (
        <Controller
          name={f.name}
          control={control}
          rules={{ required: requiredRule }}
          render={({ field }) => (
            <Select label={f.label} data={f.options} error={errors[f.name]?.message} {...field} />
          )}
        />
      );
    case 'date':
      return (
        <Controller
          name={f.name}
          control={control}
          rules={{ required: requiredRule }}
          render={({ field }) => (
            <DateInput label={f.label} valueFormat="DD/MM/YYYY" error={errors[f.name]?.message} {...field} />
          )}
        />
      );
    case 'datetime':
      return (
        <Controller
          name={f.name}
          control={control}
          rules={{ required: requiredRule }}
          render={({ field }) => (
            <DateTimePicker
              label={f.label}
              valueFormat="DD/MM/YYYY HH:mm"
              error={errors[f.name]?.message}
              {...field}
            />
          )}
        />
      );
    case 'image':
    case 'file':
      return (
        <Controller
          name={f.name}
          control={control}
          render={({ field }) => (
            <MediaUploadField
              label={f.label}
              value={field.value}
              onChange={field.onChange}
              accept={f.type === 'image' ? 'image/*' : 'application/pdf'}
              isImage={f.type === 'image'}
            />
          )}
        />
      );
    default:
      return (
        <TextInput
          label={f.label}
          error={errors[f.name]?.message}
          {...register(f.name, { required: requiredRule })}
        />
      );
  }
}

export default function CrudPage({ config }) {
  const {
    title, service, folder, columns, fields, listOptions,
  } = config;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    register, control, handleSubmit, reset, formState: { errors },
  } = useForm();

  const load = () => {
    setLoading(true);
    service
      .list(listOptions || { limit: 100 })
      .then((data) => setItems(data || []))
      .catch(() => notifications.show({
        title: 'Erro ao carregar',
        message: 'Verifique a conexão com o Supabase e se o schema.sql foi aplicado.',
        color: 'red',
      }))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditingItem(null);
    reset(Object.fromEntries(fields.map((f) => [f.name, defaultFieldValue(f)])));
    setModalOpened(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    reset(Object.fromEntries(fields.map((f) => [f.name, fieldValueFromItem(f, item)])));
    setModalOpened(true);
  };

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = {};
      for (const f of fields) {
        let value = values[f.name];
        if ((f.type === 'image' || f.type === 'file') && value instanceof File) {
          value = await uploadMedia(folder, value);
        }
        if ((f.type === 'date' || f.type === 'datetime') && value instanceof Date) {
          value = value.toISOString();
        }
        payload[f.name] = value;
      }

      if (editingItem) {
        await service.update(editingItem.id, payload);
      } else {
        await service.create(payload);
      }

      notifications.show({ title: 'Salvo com sucesso', message: title, color: 'navy' });
      setModalOpened(false);
      load();
    } catch (err) {
      notifications.show({ title: 'Erro ao salvar', message: err.message || 'Tente novamente.', color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await service.remove(deleteTarget.id);
      notifications.show({ title: 'Item removido', message: title, color: 'navy' });
      setDeleteTarget(null);
      load();
    } catch (err) {
      notifications.show({ title: 'Erro ao remover', message: err.message || 'Tente novamente.', color: 'red' });
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title order={3}>{title}</Title>
        <Button leftSection={<Plus size={16} />} radius="xl" color="navy.8" onClick={openCreate}>
          Novo
        </Button>
      </Group>

      {loading ? (
        <Group justify="center" py={60}><Loader color="navy" /></Group>
      ) : (
        <Table striped highlightOnHover verticalSpacing="sm" className={styles.table}>
          <Table.Thead>
            <Table.Tr>
              {columns.map((c) => <Table.Th key={c.key}>{c.label}</Table.Th>)}
              <Table.Th w={90}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items.map((item) => (
              <Table.Tr key={item.id}>
                {columns.map((c) => (
                  <Table.Td key={c.key}>{c.render ? c.render(item) : item[c.key]}</Table.Td>
                ))}
                <Table.Td>
                  <Group gap={6}>
                    <ActionIcon variant="subtle" color="navy" onClick={() => openEdit(item)} aria-label="Editar">
                      <Pencil size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={() => setDeleteTarget(item)} aria-label="Excluir">
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
            {!items.length && (
              <Table.Tr>
                <Table.Td colSpan={columns.length + 1}>
                  <Text c="dimmed" ta="center" py={30}>Nenhum registro cadastrado.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingItem ? `Editar — ${title}` : `Novo — ${title}`}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((f) => (
            <div key={f.name} className={styles.field}>
              {renderField(f, { register, control, errors })}
            </div>
          ))}
          <Button type="submit" mt="md" fullWidth radius="xl" color="navy.8" loading={saving}>
            Salvar
          </Button>
        </form>
      </Modal>

      <Modal opened={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirmar exclusão" size="sm">
        <Text mb="lg">Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita.</Text>
        <Group justify="flex-end">
          <Button variant="default" radius="xl" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button color="red" radius="xl" onClick={confirmDelete}>Excluir</Button>
        </Group>
      </Modal>
    </div>
  );
}
