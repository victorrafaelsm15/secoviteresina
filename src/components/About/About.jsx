import { motion } from 'framer-motion';
import { aboutContent } from '../../services/siteContent';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={`section ${styles.section}`} id="sobre">
      <div className={`container ${styles.wrap}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{aboutContent.eyebrow}</span>
          <h2 className={`section-title ${styles.title}`}>{aboutContent.title}</h2>
          <p className={`section-subtitle ${styles.text}`}>{aboutContent.text}</p>
        </motion.div>
      </div>
    </section>
  );
}
