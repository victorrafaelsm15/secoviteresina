import { Target, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { missionVisionValues } from '../../services/siteContent';
import styles from './MissionVisionValues.module.css';

export default function MissionVisionValues() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Missão, Visão e Valores</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 34px)', margin: '12px 0' }}>
            O que nos move
          </h2>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.iconWrap}><Target size={22} /></span>
            <h3 className={styles.cardTitle}>Missão</h3>
            <p className={styles.cardDesc}>{missionVisionValues.mission}</p>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <span className={styles.iconWrap}><Eye size={22} /></span>
            <h3 className={styles.cardTitle}>Visão</h3>
            <p className={styles.cardDesc}>{missionVisionValues.vision}</p>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            <span className={styles.iconWrap}><Sparkles size={22} /></span>
            <h3 className={styles.cardTitle}>Valores</h3>
            <div className={styles.tags}>
              {missionVisionValues.values.map((v) => (
                <span key={v} className={styles.tag}>{v}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
