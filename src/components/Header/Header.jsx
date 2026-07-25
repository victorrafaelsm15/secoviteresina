import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Drawer, Burger, TextInput, ActionIcon, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Phone, Mail, Clock, Search, X,
} from 'lucide-react';
import { IconBrandInstagram, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';
import { siteInfo } from '../../services/siteContent';
import styles from './Header.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/noticias', label: 'Notícias' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/documentos', label: 'Documentos' },
  { to: '/diretoria', label: 'Diretoria' },
  { to: '/contato', label: 'Contato' },
];

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarInfo}>
            <a href={`tel:${siteInfo.phone}`} className={styles.topBarItem}>
              <Phone size={14} /> {siteInfo.phone}
            </a>
            <a href={`mailto:${siteInfo.email}`} className={styles.topBarItem}>
              <Mail size={14} /> {siteInfo.email}
            </a>
            <span className={styles.topBarItem}>
              <Clock size={14} /> {siteInfo.hours}
            </span>
          </div>
          <div className={styles.topBarSocial}>
            <a href={siteInfo.social.instagram} aria-label="Instagram"><IconBrandInstagram size={15} /></a>
            <a href={siteInfo.social.facebook} aria-label="Facebook"><IconBrandFacebook size={15} /></a>
            <a href={siteInfo.social.linkedin} aria-label="LinkedIn"><IconBrandLinkedin size={15} /></a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.mainBar}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>S</span>
          <span className={styles.logoText}>
            {siteInfo.shortName}
            <span className={styles.logoSub}>{siteInfo.logoSubtitle}</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ActionIcon variant="subtle" color="navy.8" onClick={() => setSearchOpen((v) => !v)} aria-label="Pesquisar">
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </ActionIcon>
          <Button component={Link} to="/filiacao" radius="xl" color="gold.6" c="navy.9" fw={700}>
            Filie-se
          </Button>
          <Burger opened={opened} onClick={open} className={styles.burger} aria-label="Abrir menu" />
        </div>
      </div>

      {searchOpen && (
        <div className={`container ${styles.searchBar}`}>
          <TextInput
            placeholder="Pesquisar no portal..."
            radius="xl"
            size="md"
            autoFocus
            leftSection={<Search size={16} />}
          />
        </div>
      )}

      <Drawer opened={opened} onClose={close} position="right" size="85%" title="Menu" padding="lg">
        <div className={styles.drawerNav}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={styles.drawerLink} onClick={close}>
              {link.label}
            </NavLink>
          ))}
          <Button component={Link} to="/filiacao" onClick={close} fullWidth radius="xl" color="gold.6" c="navy.9" fw={700} mt="md">
            Filie-se
          </Button>
        </div>
      </Drawer>
    </header>
  );
}
