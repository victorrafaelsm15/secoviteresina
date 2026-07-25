import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, TextInput, PasswordInput, Paper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAdminAuth } from './AdminAuthContext';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
  const { session, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  if (session) return <Navigate to="/admin" replace />;

  const onSubmit = async ({ email, password }) => {
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch {
      notifications.show({
        title: 'Não foi possível entrar',
        message: 'Verifique o e-mail e a senha informados.',
        color: 'red',
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <Paper withBorder radius="lg" p="xl" className={styles.paper}>
        <Title order={3} ta="center" mb="lg">Painel administrativo</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="E-mail"
            error={errors.email?.message}
            {...register('email', { required: 'Campo obrigatório' })}
          />
          <PasswordInput
            label="Senha"
            mt="md"
            error={errors.password?.message}
            {...register('password', { required: 'Campo obrigatório' })}
          />
          <Button type="submit" mt="lg" fullWidth radius="xl" color="navy.8" loading={isSubmitting}>
            Entrar
          </Button>
        </form>
      </Paper>
    </div>
  );
}
