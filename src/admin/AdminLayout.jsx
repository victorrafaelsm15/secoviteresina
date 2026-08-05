import { NavLink as RouterNavLink, Outlet } from 'react-router-dom';
import {
  Newspaper, CalendarDays, FileText, Handshake, Users, UserPlus, LogOut,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { siteInfo } from '../services/siteContent';
import styles from './AdminLayout.module.css';

const NAV_LINKS = [
  { to: '/admin/noticias', label: 'Notícias', icon: Newspaper },
  { to: '/admin/eventos', label: 'Eventos', icon: CalendarDays },
  { to: '/admin/documentos', label: 'Documentos', icon: FileText },
  { to: '/admin/parceiros', label: 'Parceiros', icon: Handshake },
  { to: '/admin/diretoria', label: 'Diretoria', icon: Users },
  { to: '/admin/filiacoes', label: 'Filiações', icon: UserPlus },
];

export default function AdminLayout() {
  const { user, signOut } = useAdminAuth();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Painel {siteInfo.shortName}</div>
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <RouterNavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <Icon size={17} /> {label}
            </RouterNavLink>
          ))}
        </nav>
        <button type="button" className={styles.signOut} onClick={signOut}>
          <LogOut size={17} /> Sair
        </button>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <span>{user?.email}</span>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
