import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { quickAccess } from '../../services/siteContent';
import styles from './QuickAccess.module.css';

export default function QuickAccess() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          {quickAccess.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.Circle;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={styles.card}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <span className={styles.iconWrap}>
                  <Icon size={22} />
                </span>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardDesc}>{item.description}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
