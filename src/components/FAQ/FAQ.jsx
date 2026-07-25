import { Accordion } from '@mantine/core';
import { faqItems } from '../../services/siteContent';
import styles from './FAQ.module.css';

export default function FAQ() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3vw, 34px)', margin: '12px 0' }}>
            Perguntas frequentes
          </h2>
        </div>

        <Accordion variant="separated" radius="lg" className={styles.accordion}>
          {faqItems.map((item, i) => (
            <Accordion.Item key={item.question} value={`item-${i}`}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
