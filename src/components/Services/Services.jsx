import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '../../services/siteContent';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section className={`section ${styles.section}`} id="servicos">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">O que oferecemos</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 36px)', margin: '12px 0' }}>
            Serviços institucionais
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 560 }}>
            Um conjunto completo de serviços pensado para apoiar a categoria em todas as etapas.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => {
            const Icon = Icons[service.icon] || Icons.Star;
            return (
              <motion.div
                key={service.id}
                className={styles.card}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                <span className={styles.iconWrap}>
                  <Icon size={24} />
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <button type="button" className={styles.cardLink}>
                  Saiba mais <ArrowRight size={15} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
