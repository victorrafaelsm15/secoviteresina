import { Carousel } from '@mantine/carousel';
import { Quote } from 'lucide-react';
import { testimonials } from '../../services/siteContent';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Depoimentos</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 34px)', margin: '12px 0' }}>
            O que dizem nossos associados
          </h2>
        </div>

        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
          slideGap="md"
          withControls
          withIndicators
          emblaOptions={{ loop: true, align: 'start' }}
        >
          {testimonials.map((t) => (
            <Carousel.Slide key={t.name + t.text.slice(0, 8)}>
              <div className={styles.card}>
                <Quote size={26} className={styles.quoteIcon} />
                <p className={styles.text}>{t.text}</p>
                <div className={styles.author}>
                  <span className={styles.authorName}>{t.name}</span>
                  <span className={styles.authorRole}>{t.role}</span>
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
