import { motion } from 'framer-motion';
import { historyText } from '../../services/siteContent';
import styles from './History.module.css';

export default function History() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Nossa história</span>
          <h2 className={`section-title ${styles.title}`}>Como tudo começou</h2>
          <p className={`section-subtitle ${styles.text}`}>{historyText}</p>
        </motion.div>
      </div>
    </section>
  );
}
