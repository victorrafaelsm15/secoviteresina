import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { listNews } from '../../services/newsService';
import styles from './News.module.css';

export const PLACEHOLDER_NEWS = [
  { id: 'ph1', title: 'Sindicato realiza encontro anual da categoria', category: 'Institucional', published_at: new Date().toISOString(), excerpt: 'Evento reuniu associados para discutir os próximos passos da entidade.', content: 'Evento reuniu associados para discutir os próximos passos da entidade.', image_url: null },
  { id: 'ph2', title: 'Nova convenção coletiva é assinada', category: 'Jurídico', published_at: new Date().toISOString(), excerpt: 'Documento traz avanços importantes para a categoria representada.', content: 'Documento traz avanços importantes para a categoria representada.', image_url: null },
  { id: 'ph3', title: 'Inscrições abertas para curso de capacitação', category: 'Cursos', published_at: new Date().toISOString(), excerpt: 'Nova turma de formação profissional começa no próximo mês.', content: 'Nova turma de formação profissional começa no próximo mês.', image_url: null },
];

export default function News({ limit = 3, showViewAll = true }) {
  const [news, setNews] = useState(PLACEHOLDER_NEWS.slice(0, limit));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listNews({ limit })
      .then((data) => {
        if (active && data?.length) setNews(data);
      })
      .catch(() => {
        // Mantém o conteúdo placeholder caso o Supabase ainda não esteja configurado
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [limit]);

  return (
    <section className={`section ${styles.section}`} id="noticias">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="eyebrow">Fique por dentro</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 36px)', margin: '12px 0 0' }}>
              Notícias e comunicados
            </h2>
          </div>
          {showViewAll && (
            <Link to="/noticias" className={styles.viewAll}>
              Ver todas <ArrowRight size={15} />
            </Link>
          )}
        </div>

        <div className={styles.grid} aria-busy={loading}>
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className={styles.cardImage}
                style={item.image_url ? { backgroundImage: `url(${item.image_url})` } : undefined}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.metaTag}><Tag size={12} /> {item.category}</span>
                  <span className={styles.metaTag}>
                    <Calendar size={12} /> {new Date(item.published_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardExcerpt}>{item.excerpt}</p>
                <Link to={`/noticias/${item.id}`} className={styles.cardLink}>
                  Ler mais <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
