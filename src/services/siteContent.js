// Conteúdo institucional do sindicato.
// Organizado a partir do site atual para facilitar revisão e edição.
// Substitua os textos abaixo pelo conteúdo oficial definitivo quando disponível.

export const siteInfo = {
  // Nome oficial por extenso, conforme o Estatuto Social. Não exibir em
  // pontos de maior destaque (header/logo/hero) — usar em título da página,
  // rodapé ou corpo de texto institucional.
  name: 'Sindicato dos Condomínios Residenciais, Comerciais e Mistos do Estado do Piauí',
  legalAbbreviation: 'SINDICONDOMÍNIOS/PI',
  shortName: 'Sindicondomínios-PI',
  logoSubtitle: 'Piauí',
  // PENDENTE — inserir telefone real assim que fornecido pelo cliente.
  phone: '',
  // PENDENTE — inserir WhatsApp real (apenas números, com DDD, ex: "86999998888").
  // O botão de WhatsApp já funciona automaticamente assim que este campo for preenchido.
  whatsapp: '',
  // PENDENTE — inserir e-mail real assim que fornecido pelo cliente.
  email: '',
  hours: 'Seg. a Sex. — 08h às 18h',
  address: 'Rua Manoel Nogueira Lima, nº 1770, Bairro Jóquei, Teresina/PI, CEP 64.049-190',
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
};

export const quickAccess = [
  { id: 'documentos', title: 'Documentos', description: 'Convenções, editais e formulários.', icon: 'FileText' },
  { id: 'convencao', title: 'Convenção Coletiva', description: 'Acordos e convenções vigentes.', icon: 'FileSignature' },
  { id: 'juridico', title: 'Consultoria Jurídica', description: 'Orientação jurídica especializada.', icon: 'Scale' },
  { id: 'cursos', title: 'Cursos', description: 'Formação e capacitação profissional.', icon: 'GraduationCap' },
  { id: 'eventos', title: 'Eventos', description: 'Agenda de eventos institucionais.', icon: 'CalendarDays' },
  { id: 'editais', title: 'Editais', description: 'Editais e comunicados oficiais.', icon: 'ScrollText' },
  { id: 'contato', title: 'Contato', description: 'Fale diretamente com o sindicato.', icon: 'Phone' },
];

export const aboutContent = {
  eyebrow: 'Quem somos',
  title: 'Representação institucional para os condomínios do Piauí',
  text: `O ${siteInfo.name} (${siteInfo.legalAbbreviation}) atua na defesa dos interesses da categoria em todo o Estado do Piauí, promovendo representação institucional, segurança jurídica e valorização profissional para condomínios residenciais, comerciais e mistos, administradoras de condomínios, imobiliárias e shopping centers.`,
};

export const services = [
  { id: 1, title: 'Consultoria Jurídica', description: 'Orientação jurídica especializada para associados em questões trabalhistas e institucionais.', icon: 'Scale' },
  { id: 2, title: 'Consultoria Trabalhista', description: 'Suporte completo em legislação trabalhista e relações de trabalho.', icon: 'Briefcase' },
  { id: 3, title: 'Representação Sindical', description: 'Defesa coletiva dos interesses da categoria perante órgãos e instituições.', icon: 'Landmark' },
  { id: 4, title: 'Cursos e Capacitação', description: 'Programas de formação continuada para desenvolvimento profissional.', icon: 'GraduationCap' },
  { id: 5, title: 'Eventos', description: 'Congressos, palestras e encontros institucionais ao longo do ano.', icon: 'CalendarDays' },
  { id: 6, title: 'Certidões', description: 'Emissão de certidões e documentos oficiais para associados.', icon: 'FileCheck' },
  { id: 7, title: 'Benefícios', description: 'Convênios e vantagens exclusivas para a categoria.', icon: 'Gift' },
  { id: 8, title: 'Parcerias', description: 'Rede de parceiros institucionais e comerciais.', icon: 'Handshake' },
];

export const benefits = [
  { title: 'Convênios em Saúde', description: 'Condições especiais em planos de saúde e odontológicos.', icon: 'HeartPulse' },
  { title: 'Descontos Educacionais', description: 'Parcerias com instituições de ensino e cursos.', icon: 'BookOpen' },
  { title: 'Assessoria Jurídica Gratuita', description: 'Atendimento jurídico incluso para associados.', icon: 'Scale' },
  { title: 'Eventos Exclusivos', description: 'Acesso prioritário a eventos e capacitações.', icon: 'Sparkles' },
];

export const boardMembers = [
  { name: 'Presidente', role: 'Presidência', description: 'Responsável pela representação institucional da entidade.' },
  { name: 'Vice-presidente', role: 'Vice-presidência', description: 'Apoio à gestão institucional e estratégica.' },
  { name: 'Diretor Jurídico', role: 'Diretoria Jurídica', description: 'Condução das questões jurídicas da entidade.' },
  { name: 'Diretor Financeiro', role: 'Diretoria Financeira', description: 'Gestão financeira e orçamentária.' },
];

export const documentCategories = [
  { value: 'convencao', label: 'Convenção Coletiva' },
  { value: 'contribuicao', label: 'Contribuição Assistencial' },
  { value: 'editais', label: 'Convocações e Editais' },
  { value: 'prestacao', label: 'Prestações de Contas' },
];

export const faqItems = [
  { question: 'Como me tornar associado?', answer: 'O cadastro pode ser realizado pela página de Filiação, mediante apresentação da documentação exigida.' },
  { question: 'Quais os benefícios de ser associado?', answer: 'Associados têm acesso a consultoria jurídica, convênios, cursos e eventos exclusivos.' },
  { question: 'Como acesso a Convenção Coletiva vigente?', answer: 'O documento está disponível na área de Documentos, com atualização periódica.' },
  { question: 'Como entro em contato com a diretoria?', answer: 'Utilize os canais disponíveis na seção de Contato, incluindo telefone, e-mail e WhatsApp.' },
];

// Direitos e deveres do associado, conforme Art. 6º e Art. 8º do Estatuto Social.
export const associateRights = [
  'Utilizar as dependências do Sindicato',
  'Votar e ser votado nas eleições sindicais',
  'Participar das Assembleias Gerais',
  'Gozar dos benefícios e da assistência do Sindicato, incluindo assistência judiciária',
  'Requerer a convocação de Assembleia Geral Extraordinária, com o apoio de 10% dos associados',
  'Participar de eventos e promoções realizados pelo Sindicato',
  'Desligar-se do quadro associativo a qualquer momento, sem ônus',
  'Não responder solidária ou subsidiariamente pelas obrigações do Sindicato',
];

export const associateDuties = [
  'Pagar a mensalidade definida pela Diretoria e aprovada em Assembleia Geral',
  'Participar das Assembleias Gerais, ordinárias e extraordinárias',
];
