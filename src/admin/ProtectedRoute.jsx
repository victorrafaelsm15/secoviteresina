import { Navigate, Outlet } from 'react-router-dom';
import { Group, Loader } from '@mantine/core';
import { useAdminAuth } from './AdminAuthContext';

export default function ProtectedRoute() {
  const { session, loading } = useAdminAuth();

  if (loading) {
    return (
      <Group justify="center" py={80}>
        <Loader color="navy" />
      </Group>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
