import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader, Group, Text } from '@mantine/core';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { getNewsById } from '../services/newsService';
import { PLACEHOLDER_NEWS } from '../components/News/News';
import PageHeader from '../components/PageHeader/PageHeader';
import styles from './NewsDetailPage.module.css';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getNewsById(id)
      .then((data) => {
        if (active) setNews(data);
      })
      .catch(() => {
        if (active) setNews(PLACEHOLDER_NEWS.find((item) => item.id === id) ?? null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Group justify="center" py={100}>
        <Loader color="navy" />
      </Group>
    );
  }

  if (!news) {
    return (
      <>
        <PageHeader title="Notícia não encontrada" subtitle="O conteúdo que você procura não está mais disponível." />
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <Link to="/noticias" className={styles.backLink}>
              <ArrowLeft size={16} /> Voltar para notícias
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title={news.title} />
      <section className="section">
        <div className={`container ${styles.wrap}`}>
          <Link to="/noticias" className={styles.backLink}>
            <ArrowLeft size={16} /> Voltar para notícias
          </Link>

          <Group gap={16} mt="md" mb="lg">
            {news.category && (
              <Text size="xs" fw={700} className={styles.metaTag}>
                <Tag size={13} /> {news.category}
              </Text>
            )}
            {news.published_at && (
              <Text size="xs" fw={700} className={styles.metaTag}>
                <Calendar size={13} /> {new Date(news.published_at).toLocaleDateString('pt-BR')}
              </Text>
            )}
          </Group>

          {news.image_url && (
            <div className={styles.image} style={{ backgroundImage: `url(${news.image_url})` }} />
          )}

          <div className={styles.body}>
            {(news.content || news.excerpt || '').split('\n').filter(Boolean).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
