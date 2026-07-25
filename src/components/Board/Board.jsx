import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { boardService } from '../../services';
import { boardMembers } from '../../services/siteContent';
import styles from './Board.module.css';

export default function Board() {
  const [members, setMembers] = useState(boardMembers);

  useEffect(() => {
    let active = true;
    boardService
      .list({ limit: 50, ascending: true })
      .then((data) => {
        if (active && data?.length) setMembers(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={`section ${styles.section}`} id="diretoria">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Governança</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 34px)', margin: '12px 0' }}>
            Diretoria executiva
          </h2>
        </div>
        <div className={styles.grid}>
          {members.map((m, i) => (
            <motion.div
              key={m.id ?? m.name}
              className={styles.card}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className={styles.photo}
                style={m.photo_url ? { backgroundImage: `url(${m.photo_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              />
              <h3 className={styles.name}>{m.name}</h3>
              <span className={styles.role}>{m.role}</span>
              <p className={styles.desc}>{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
