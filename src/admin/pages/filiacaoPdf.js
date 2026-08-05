import jsPDF from 'jspdf';

export function downloadFiliacaoPdf(item) {
  const doc = new jsPDF();
  const marginX = 20;
  let y = 25;

  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Solicitação de Filiação', marginX, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Recebida em ${new Date(item.created_at).toLocaleString('pt-BR')}`, marginX, y);

  y += 14;
  const rows = [
    ['Nome do síndico', item.sindico_name],
    ['Nome do condomínio', item.condominio_name],
    ['CNPJ do condomínio', item.cnpj],
    ['E-mail', item.email],
    ['Telefone', item.phone || '—'],
    ['Categoria', item.category || '—'],
  ];

  doc.setFontSize(12);
  rows.forEach(([label, value]) => {
    doc.setFont(undefined, 'bold');
    doc.text(`${label}:`, marginX, y);
    doc.setFont(undefined, 'normal');
    doc.text(String(value), marginX + 55, y);
    y += 10;
  });

  const safeName = (item.condominio_name || 'solicitacao').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  doc.save(`filiacao-${safeName}.pdf`);
}
