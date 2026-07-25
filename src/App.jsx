import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import ServicosPage from './pages/ServicosPage';
import NoticiasPage from './pages/NoticiasPage';
import EventsPage from './pages/EventsPage';
import DocumentsPage from './pages/DocumentsPage';
import DiretoriaPage from './pages/DiretoriaPage';
import ParceirosPage from './pages/ParceirosPage';
import ContatoPage from './pages/ContatoPage';
import FiliacaoPage from './pages/FiliacaoPage';

import { AdminAuthProvider } from './admin/AdminAuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLoginPage from './admin/AdminLoginPage';
import AdminLayout from './admin/AdminLayout';
import CrudPage from './admin/components/CrudPage';
import { newsConfig } from './admin/entities/newsConfig';
import { eventsConfig } from './admin/entities/eventsConfig';
import { documentsConfig } from './admin/entities/documentsConfig';
import { partnersConfig } from './admin/entities/partnersConfig';
import { boardConfig } from './admin/entities/boardConfig';

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/documentos" element={<DocumentsPage />} />
          <Route path="/diretoria" element={<DiretoriaPage />} />
          <Route path="/parceiros" element={<ParceirosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/filiacao" element={<FiliacaoPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="noticias" replace />} />
            <Route path="noticias" element={<CrudPage config={newsConfig} />} />
            <Route path="eventos" element={<CrudPage config={eventsConfig} />} />
            <Route path="documentos" element={<CrudPage config={documentsConfig} />} />
            <Route path="parceiros" element={<CrudPage config={partnersConfig} />} />
            <Route path="diretoria" element={<CrudPage config={boardConfig} />} />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
