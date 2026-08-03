import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { activityAreas } from '../../services/siteContent';
import styles from './ActivityAreas.module.css';

export default function ActivityAreas() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Nossa atuação</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 34px)', margin: '12px 0' }}>
            Áreas de atuação do Sindicato
          </h2>
        </div>

        <ul className={styles.list}>
          {activityAreas.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            >
              <CheckCircle2 size={18} /> {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
