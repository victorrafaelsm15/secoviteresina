import { useEffect, useState } from 'react';
import { partnersService } from '../../services';
import styles from './Partners.module.css';

const PLACEHOLDER_PARTNERS = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i}`,
  name: `Parceiro ${i + 1}`,
  logo_url: null,
  website_url: null,
}));

export default function Partners() {
  const [partners, setPartners] = useState(PLACEHOLDER_PARTNERS);

  useEffect(() => {
    let active = true;
    partnersService
      .list({ limit: 50, ascending: true })
      .then((data) => {
        if (active && data?.length) setPartners(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const loopList = [...partners, ...partners];

  return (
    <section className={`section ${styles.section}`} id="parceiros">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Rede institucional</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', margin: '12px 0' }}>
            Parceiros
          </h2>
        </div>
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {loopList.map((p, i) => {
            const content = p.logo_url
              ? <img src={p.logo_url} alt={p.name} className={styles.logoImg} />
              : p.name;
            return p.website_url ? (
              <a key={`${p.id}-${i}`} href={p.website_url} target="_blank" rel="noreferrer" className={styles.logo}>
                {content}
              </a>
            ) : (
              <div key={`${p.id}-${i}`} className={styles.logo}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
