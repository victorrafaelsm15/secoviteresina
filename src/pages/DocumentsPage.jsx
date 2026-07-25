import { useEffect, useState } from 'react';
import { TextInput, Select, Card, Text, Group, Loader } from '@mantine/core';
import { FileText, Search, Download } from 'lucide-react';
import { documentsService } from '../services';
import { documentCategories } from '../services/siteContent';
import PageHeader from '../components/PageHeader/PageHeader';
import styles from './DocumentsPage.module.css';

const CATEGORIES = [{ value: '', label: 'Todas as categorias' }, ...documentCategories];

const PLACEHOLDER_DOCS = [
  { id: 'd1', title: 'Convenção Coletiva de Trabalho 2025', category: 'convencao', created_at: new Date().toISOString(), file_url: '#' },
  { id: 'd2', title: 'Guia de Contribuição Assistencial Patronal', category: 'contribuicao', created_at: new Date().toISOString(), file_url: '#' },
  { id: 'd3', title: 'Edital de Convocação — Assembleia Geral', category: 'editais', created_at: new Date().toISOString(), file_url: '#' },
  { id: 'd4', title: 'Prestação de Contas — Exercício Anterior', category: 'prestacao', created_at: new Date().toISOString(), file_url: '#' },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(PLACEHOLDER_DOCS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    let active = true;
    documentsService
      .list({ limit: 100 })
      .then((data) => {
        if (active && data?.length) setDocs(data);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filtered = docs.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || d.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHeader
        title="Documentos"
        subtitle="Convenções, editais, contribuições e prestações de contas em um só lugar."
      />
      <section className="section">
        <div className="container">
          <div className={styles.filters}>
            <TextInput
              placeholder="Pesquisar documento..."
              leftSection={<Search size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              radius="xl"
              className={styles.search}
            />
            <Select
              data={CATEGORIES}
              value={category}
              onChange={setCategory}
              radius="xl"
              placeholder="Categoria"
              className={styles.select}
            />
          </div>

          {loading ? (
            <Group justify="center" py={40}><Loader color="navy" /></Group>
          ) : (
            <div className={styles.grid}>
              {filtered.map((doc) => (
                <Card key={doc.id} withBorder radius="lg" className={styles.card}>
                  <Group>
                    <div className={styles.iconWrap}><FileText size={20} /></div>
                    <div style={{ flex: 1 }}>
                      <Text fw={700} size="sm">{doc.title}</Text>
                      <Text size="xs" c="dimmed">
                        {new Date(doc.created_at).toLocaleDateString('pt-BR')}
                      </Text>
                    </div>
                  </Group>
                  <a href={doc.file_url} className={styles.downloadLink} target="_blank" rel="noreferrer">
                    <Download size={14} /> Baixar
                  </a>
                </Card>
              ))}
              {!filtered.length && (
                <Text c="dimmed" ta="center" py={40}>Nenhum documento encontrado.</Text>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
