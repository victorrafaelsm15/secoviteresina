import { MessageCircle } from 'lucide-react';
import { siteInfo } from '../services/siteContent';

export default function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/55${siteInfo.whatsapp.replace(/\D/g, '')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25d366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
        zIndex: 300,
      }}
    >
      <MessageCircle size={26} color="#fff" />
    </a>
  );
}
