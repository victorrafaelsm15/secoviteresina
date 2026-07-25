import { motion } from 'framer-motion';
import { aboutContent } from '../../services/siteContent';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={`section ${styles.section}`} id="sobre">
      <div className={`container ${styles.grid}`}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{aboutContent.eyebrow}</span>
          <h2 className={`section-title ${styles.title}`}>{aboutContent.title}</h2>
          <p className={`section-subtitle ${styles.text}`}>{aboutContent.text}</p>

          <div className={styles.stats}>
            {aboutContent.stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.timeline}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {aboutContent.timeline.map((item, i) => (
            <div key={item.year} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              {i !== aboutContent.timeline.length - 1 && <div className={styles.timelineLine} />}
              <div>
                <span className={styles.timelineYear}>{item.year}</span>
                <p className={styles.timelineText}>{item.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
