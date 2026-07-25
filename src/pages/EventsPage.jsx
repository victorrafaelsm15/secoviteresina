import { useEffect, useState } from 'react';
import { Button, Card, Text, Group, Loader } from '@mantine/core';
import { CalendarDays, MapPin } from 'lucide-react';
import { eventsService } from '../services';
import PageHeader from '../components/PageHeader/PageHeader';
import styles from './EventsPage.module.css';

const PLACEHOLDER_EVENTS = [
  { id: 'e1', title: 'Congresso Estadual da Categoria', event_date: new Date(Date.now() + 12 * 864e5).toISOString(), location: 'Teresina/PI', description: 'Encontro anual reunindo associados e parceiros institucionais.' },
  { id: 'e2', title: 'Curso de Capacitação Profissional', event_date: new Date(Date.now() + 25 * 864e5).toISOString(), location: 'Sede do sindicato', description: 'Formação voltada à atualização técnica da categoria.' },
  { id: 'e3', title: 'Assembleia Geral Ordinária', event_date: new Date(Date.now() + 40 * 864e5).toISOString(), location: 'Auditório central', description: 'Prestação de contas e deliberações institucionais.' },
];

export default function EventsPage() {
  const [events, setEvents] = useState(PLACEHOLDER_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    eventsService
      .list({ limit: 50, ascending: true })
      .then((data) => {
        if (active && data?.length) setEvents(data);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHeader title="Eventos" subtitle="Confira a agenda de eventos, cursos e encontros institucionais." />
      <section className="section">
        <div className="container">
          {loading ? (
            <Group justify="center" py={40}><Loader color="navy" /></Group>
          ) : (
            <div className={styles.list}>
              {events.map((ev) => {
                const date = new Date(ev.event_date);
                return (
                  <Card key={ev.id} withBorder radius="lg" className={styles.card}>
                    <div className={styles.dateBox}>
                      <span className={styles.day}>{date.getDate()}</span>
                      <span className={styles.month}>
                        {date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                      </span>
                    </div>
                    <div className={styles.info}>
                      <Text fw={700} size="md">{ev.title}</Text>
                      <Group gap={16} mt={4}>
                        <Text size="xs" c="dimmed" className={styles.metaItem}>
                          <CalendarDays size={13} /> {date.toLocaleDateString('pt-BR')}
                        </Text>
                        {ev.location && (
                          <Text size="xs" c="dimmed" className={styles.metaItem}>
                            <MapPin size={13} /> {ev.location}
                          </Text>
                        )}
                      </Group>
                      {ev.description && <Text size="sm" c="dimmed" mt={8}>{ev.description}</Text>}
                    </div>
                    <Button variant="light" color="navy" radius="xl" size="xs">Inscrever-se</Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
