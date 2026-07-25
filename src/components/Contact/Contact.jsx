import { useForm } from 'react-hook-form';
import { Button, TextInput, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { siteInfo } from '../../services/siteContent';
import styles from './Contact.module.css';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    notifications.show({
      title: 'Mensagem enviada',
      message: 'Obrigado pelo contato. Retornaremos em breve.',
      color: 'navy',
    });
    reset();
  };

  return (
    <section className={`section ${styles.section}`} id="contato">
      <div className={`container ${styles.inner}`}>
        <div className={styles.infoCol}>
          <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>Fale conosco</span>
          <h2 className={styles.title}>Quer saber mais?</h2>
          <p className={styles.subtitle}>
            Nossa equipe está pronta para atender associados e interessados em conhecer o
            trabalho do sindicato.
          </p>

          <ul className={styles.infoList}>
            <li><MapPin size={18} /> {siteInfo.address}</li>
            <li><Phone size={18} /> {siteInfo.phone}</li>
            <li><Mail size={18} /> {siteInfo.email}</li>
            <li><Clock size={18} /> {siteInfo.hours}</li>
          </ul>

          <a
            href={`https://wa.me/55${siteInfo.whatsapp.replace(/\D/g, '')}`}
            className={styles.whatsappBtn}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> Falar pelo WhatsApp
          </a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Nome"
            placeholder="Seu nome completo"
            error={errors.name?.message}
            {...register('name', { required: 'Informe seu nome' })}
          />
          <TextInput
            label="E-mail"
            placeholder="seu@email.com"
            mt="md"
            error={errors.email?.message}
            {...register('email', { required: 'Informe seu e-mail' })}
          />
          <TextInput
            label="Telefone"
            placeholder="(00) 00000-0000"
            mt="md"
            {...register('phone')}
          />
          <Textarea
            label="Mensagem"
            placeholder="Como podemos ajudar?"
            mt="md"
            minRows={4}
            error={errors.message?.message}
            {...register('message', { required: 'Escreva sua mensagem' })}
          />
          <Button
            type="submit"
            mt="lg"
            fullWidth
            size="md"
            radius="xl"
            color="navy.8"
            loading={isSubmitting}
          >
            Enviar mensagem
          </Button>
        </form>

        <div className={styles.mapWrap}>
          <iframe
            title={`Localização do ${siteInfo.shortName}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
