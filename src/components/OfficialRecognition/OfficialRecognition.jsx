import { Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { officialRecognition } from '../../services/siteContent';
import styles from './OfficialRecognition.module.css';

export default function OfficialRecognition() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.iconWrap}><Award size={26} /></span>
          <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>Reconhecimento oficial</span>
          <h2 className={styles.title}>Carta Sindical</h2>
          <p className={styles.date}>{officialRecognition.date}</p>
          <p className={styles.intro}>{officialRecognition.intro}</p>

          <ul className={styles.list}>
            {officialRecognition.points.map((p) => (
              <li key={p}><CheckCircle2 size={18} /> {p}</li>
            ))}
          </ul>

          <p className={styles.footer}>{officialRecognition.footer}</p>
        </motion.div>
      </div>
    </section>
  );
}
