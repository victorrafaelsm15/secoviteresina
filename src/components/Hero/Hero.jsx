import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Hero.module.css';

const INDICATORS = [
  { value: '+30', label: 'Anos de história' },
  { value: '+2.500', label: 'Associados ativos' },
  { value: '+120', label: 'Parcerias institucionais' },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className={styles.badge}>
            <ShieldCheck size={15} /> Representação institucional oficial
          </span>
          <h1 className={styles.title}>
            Fortalecendo a categoria com<br /> representação e credibilidade
          </h1>
          <p className={styles.subtitle}>
            Defendemos os interesses da categoria com atuação jurídica sólida, benefícios
            exclusivos e compromisso permanente com a valorização profissional em todo o Piauí.
          </p>
          <div className={styles.actionsRow}>
            <Button
              component={Link}
              to="/filiacao"
              size="lg"
              radius="xl"
              color="gold.6"
              c="navy.9"
              fw={700}
              rightSection={<ArrowRight size={18} />}
            >
              Associe-se agora
            </Button>
            <Button
              component={Link}
              to="/sobre"
              size="lg"
              radius="xl"
              variant="outline"
              color="white"
              className={styles.outlineBtn}
            >
              Conheça o sindicato
            </Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.indicators}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {INDICATORS.map((item) => (
            <div key={item.label} className={styles.indicatorCard}>
              <span className={styles.indicatorValue}>{item.value}</span>
              <span className={styles.indicatorLabel}>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
