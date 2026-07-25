import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { IconBrandInstagram, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';
import { siteInfo } from '../../services/siteContent';
import styles from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre o sindicato', to: '/sobre' },
      { label: 'Diretoria', to: '/diretoria' },
      { label: 'Parceiros', to: '/parceiros' },
      { label: 'Filie-se', to: '/filiacao' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Consultoria Jurídica', to: '/servicos' },
      { label: 'Cursos', to: '/servicos' },
      { label: 'Benefícios', to: '/servicos' },
      { label: 'Eventos', to: '/eventos' },
    ],
  },
  {
    title: 'Documentos',
    links: [
      { label: 'Convenção Coletiva', to: '/documentos' },
      { label: 'Contribuição Assistencial', to: '/documentos' },
      { label: 'Convocações e Editais', to: '/documentos' },
      { label: 'Prestações de Contas', to: '/documentos' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>S</span>
            <span className={styles.logoText}>{siteInfo.shortName}</span>
          </div>
          <p className={styles.tagline}>
            Representação institucional, credibilidade e valorização profissional para a categoria em todo o Piauí.
          </p>
          <div className={styles.social}>
            <a href={siteInfo.social.instagram} aria-label="Instagram"><IconBrandInstagram size={17} /></a>
            <a href={siteInfo.social.facebook} aria-label="Facebook"><IconBrandFacebook size={17} /></a>
            <a href={siteInfo.social.linkedin} aria-label="LinkedIn"><IconBrandLinkedin size={17} /></a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className={styles.col}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <ul className={styles.linkList}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contato</h4>
          <ul className={styles.contactList}>
            <li><MapPin size={15} /> {siteInfo.address}</li>
            <li><Phone size={15} /> {siteInfo.phone}</li>
            <li><Mail size={15} /> {siteInfo.email}</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>© {new Date().getFullYear()} {siteInfo.shortName}. Todos os direitos reservados.</span>
          <div className={styles.bottomLinks}>
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/lgpd">LGPD</Link>
            <Link to="/mapa-do-site">Mapa do Site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
