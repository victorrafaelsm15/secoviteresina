import { useForm } from 'react-hook-form';
import { Button, TextInput, Select, SimpleGrid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader/PageHeader';
import { associateRights, associateDuties, affiliationRequirements } from '../services/siteContent';
import { filiacaoRequestsService } from '../services';
import styles from './FiliacaoPage.module.css';

const REASONS = [
  'Assessoria jurídica especializada',
  'Convênios e descontos exclusivos',
  'Participação em eleições e assembleias',
  'Acesso a cursos e capacitações',
  'Representação institucional forte',
];

export default function FiliacaoPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (values) => {
    try {
      await filiacaoRequestsService.create(values);
      notifications.show({
        title: 'Solicitação enviada',
        message: 'Recebemos seu pedido de filiação. Nossa equipe entrará em contato.',
        color: 'navy',
      });
      reset();
    } catch {
      notifications.show({
        title: 'Erro ao enviar',
        message: 'Não foi possível registrar sua solicitação. Tente novamente.',
        color: 'red',
      });
    }
  };

  return (
    <>
      <PageHeader title="Filie-se" subtitle="Faça parte de uma entidade sólida, com representação institucional em todo o Piauí." />

      <section className="section">
        <div className="container">
          <p className={styles.rightsIntro} style={{ maxWidth: 720 }}>
            {affiliationRequirements.intro}
          </p>
          <h3 className={styles.subTitle}>Documentos necessários</h3>
          <ul className={styles.reasons}>
            {affiliationRequirements.documents.map((d) => (
              <li key={d}><CheckCircle2 size={18} /> {d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div>
            <h2 className={styles.title}>Por que se associar?</h2>
            <ul className={styles.reasons}>
              {REASONS.map((r) => (
                <li key={r}><CheckCircle2 size={18} /> {r}</li>
              ))}
            </ul>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Nome do síndico"
                error={errors.sindico_name?.message}
                {...register('sindico_name', { required: 'Campo obrigatório' })}
              />
              <TextInput
                label="Nome do condomínio"
                error={errors.condominio_name?.message}
                {...register('condominio_name', { required: 'Campo obrigatório' })}
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
              <TextInput
                label="CNPJ do condomínio"
                error={errors.cnpj?.message}
                {...register('cnpj', { required: 'Campo obrigatório' })}
              />
              <TextInput
                label="E-mail"
                error={errors.email?.message}
                {...register('email', { required: 'Campo obrigatório' })}
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
              <TextInput label="Telefone" {...register('phone')} />
            </SimpleGrid>
            <Select
              label="Categoria"
              mt="md"
              data={['Condomínio', 'Shopping Center']}
              {...register('category')}
            />
            <Button type="submit" mt="lg" fullWidth size="md" radius="xl" color="gold.6" c="navy.9" fw={700} loading={isSubmitting}>
              Enviar solicitação
            </Button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className={styles.title}>Direitos e Deveres do Associado</h2>
          <p className={styles.rightsIntro}>
            Conforme o Estatuto Social do Sindicato (Art. 6º e Art. 8º).
          </p>
          <div className={styles.rightsGrid}>
            <div>
              <h3 className={styles.subTitle}>Direitos</h3>
              <ul className={styles.reasons}>
                {associateRights.map((r) => (
                  <li key={r}><CheckCircle2 size={18} /> {r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.subTitle}>Deveres</h3>
              <ul className={styles.reasons}>
                {associateDuties.map((d) => (
                  <li key={d}><CheckCircle2 size={18} /> {d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
