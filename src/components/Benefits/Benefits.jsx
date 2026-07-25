import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { benefits } from '../../services/siteContent';
import styles from './Benefits.module.css';

export default function Benefits() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.textCol}>
          <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>Vantagens exclusivas</span>
          <h2 className={styles.title}>Benefícios para quem é associado</h2>
          <p className={styles.subtitle}>
            Ser associado significa contar com uma estrutura completa de suporte, economia e
            representação — pensada para valorizar sua atuação profissional.
          </p>
          <Button component={Link} to="/filiacao" size="md" radius="xl" color="gold.6" c="navy.9" fw={700}>
            Associe-se agora
          </Button>
        </div>

        <div className={styles.grid}>
          {benefits.map((b, i) => {
            const Icon = Icons[b.icon] || Icons.Star;
            return (
              <motion.div
                key={b.title}
                className={styles.card}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Icon size={22} />
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.cardDesc}>{b.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
