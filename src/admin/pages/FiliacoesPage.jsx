import { useEffect, useState } from 'react';
import {
  Table, ActionIcon, Modal, Group, Text, Loader, Title, Button, Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Eye, Download, Trash2 } from 'lucide-react';
import { filiacaoRequestsService } from '../../services';
import { downloadFiliacaoPdf } from './filiacaoPdf';
import styles from '../components/CrudPage.module.css';

export default function FiliacoesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    filiacaoRequestsService
      .list({ limit: 200 })
      .then((data) => setItems(data || []))
      .catch(() => notifications.show({
        title: 'Erro ao carregar',
        message: 'Verifique a conexão com o Supabase e se o schema.sql foi aplicado.',
        color: 'red',
      }))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await filiacaoRequestsService.remove(deleteTarget.id);
      notifications.show({ title: 'Solicitação removida', message: 'Filiações', color: 'navy' });
      setDeleteTarget(null);
      load();
    } catch (err) {
      notifications.show({ title: 'Erro ao remover', message: err.message || 'Tente novamente.', color: 'red' });
    }
  };

  return (
    <div>
      <Group justify="space-between" mb="lg">
        <Title order={3}>Solicitações de Filiação</Title>
      </Group>

      {loading ? (
        <Group justify="center" py={60}><Loader color="navy" /></Group>
      ) : (
        <Table striped highlightOnHover verticalSpacing="sm" className={styles.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Condomínio</Table.Th>
              <Table.Th>Síndico</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Recebida em</Table.Th>
              <Table.Th w={110}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.condominio_name}</Table.Td>
                <Table.Td>{item.sindico_name}</Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>{item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : '—'}</Table.Td>
                <Table.Td>
                  <Group gap={6}>
                    <ActionIcon variant="subtle" color="navy" onClick={() => setViewing(item)} aria-label="Ver detalhes">
                      <Eye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="navy" onClick={() => downloadFiliacaoPdf(item)} aria-label="Baixar PDF">
                      <Download size={16} />
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
                <Table.Td colSpan={5}>
                  <Text c="dimmed" ta="center" py={30}>Nenhuma solicitação recebida ainda.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}

      <Modal opened={!!viewing} onClose={() => setViewing(null)} title="Detalhes da solicitação" size="md">
        {viewing && (
          <Stack gap="xs">
            <Text><b>Nome do síndico:</b> {viewing.sindico_name}</Text>
            <Text><b>Nome do condomínio:</b> {viewing.condominio_name}</Text>
            <Text><b>CNPJ do condomínio:</b> {viewing.cnpj}</Text>
            <Text><b>E-mail:</b> {viewing.email}</Text>
            <Text><b>Telefone:</b> {viewing.phone || '—'}</Text>
            <Text><b>Categoria:</b> {viewing.category || '—'}</Text>
            <Text><b>Recebida em:</b> {viewing.created_at ? new Date(viewing.created_at).toLocaleString('pt-BR') : '—'}</Text>
            <Button
              mt="md"
              radius="xl"
              color="navy.8"
              leftSection={<Download size={16} />}
              onClick={() => downloadFiliacaoPdf(viewing)}
            >
              Baixar PDF
            </Button>
          </Stack>
        )}
      </Modal>

      <Modal opened={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirmar exclusão" size="sm">
        <Text mb="lg">Tem certeza que deseja excluir esta solicitação? Essa ação não pode ser desfeita.</Text>
        <Group justify="flex-end">
          <Button variant="default" radius="xl" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button color="red" radius="xl" onClick={confirmDelete}>Excluir</Button>
        </Group>
      </Modal>
    </div>
  );
}
