# Portal do Sindicato

Portal institucional do SINDICONDOMÍNIOS-PI (Sindicato dos Condomínios
Residenciais, Comerciais e Mistos do Estado do Piauí). React + Vite
+ Mantine, com conteúdo dinâmico via Supabase (banco + autenticação + storage)
e fallback estático quando o Supabase não está configurado.

## Rodando localmente

```bash
npm install
npm run dev
```

Sem um `.env` configurado, o site funciona normalmente com conteúdo de
exemplo (fallback), mas o painel administrativo (`/admin`) não funciona sem
Supabase.

## Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode o conteúdo de `supabase/schema.sql` — isso cria as
   tabelas (`news`, `events`, `documents`, `partners`, `board_members`), as
   políticas de RLS (leitura pública, escrita só para admin logado) e o
   bucket de storage `portal-media` usado pelo painel para upload de imagens
   e PDFs.
3. Em **Authentication → Users**, crie manualmente o(s) usuário(s) que vão
   acessar o painel admin (e-mail + senha). Não há cadastro público.
4. Copie `.env.example` para `.env` e preencha com a URL e a chave anônima
   do seu projeto (**Project Settings → API**):

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA
```

## Painel administrativo

Acesse `/admin/login` com um usuário criado no passo acima. O painel permite
gerenciar Notícias, Eventos, Documentos, Parceiros e Diretoria — cada
cadastro reflete direto nas páginas públicas correspondentes.

## Deploy (GitHub Pages)

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a
cada push na branch `main`. Passos únicos, feitos manualmente por você:

1. O repositório é `victorrafaelsm15/sindicondominios-PI` — como não é um
   repositório `usuario.github.io`, o Pages publica como página de projeto,
   em `https://victorrafaelsm15.github.io/sindicondominios-PI/`. Por isso
   `vite.config.js` define `base: '/sindicondominios-PI/'` (se o repositório
   for renomeado no futuro, esse valor precisa mudar junto).
2. Em **Settings → Pages**, em "Build and deployment", selecione a fonte
   **GitHub Actions**.
3. Em **Settings → Secrets and variables → Actions**, adicione dois
   repository secrets: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (os
   mesmos valores do seu `.env`).
4. Faça push para `main` — o workflow builda e publica automaticamente em
   `https://victorrafaelsm15.github.io/sindicondominios-PI/`.

O projeto já inclui o ajuste necessário para SPA em GitHub Pages
(`public/404.html` + script em `index.html`), então rotas como `/noticias`
ou `/admin/eventos` funcionam normalmente mesmo com carregamento direto pela
URL.

## Estrutura

- `src/services/siteContent.js` — conteúdo institucional centralizado
  (nome, contato, textos institucionais, listas estáticas de fallback).
- `src/services/` — camada de acesso ao Supabase (CRUD genérico em
  `createCrudService.js`, upload de arquivos em `storage.js`).
- `src/components/` e `src/pages/` — site público, um CSS Module por
  componente.
- `src/admin/` — painel administrativo (autenticação, layout, CRUD
  genérico reutilizado pelas 5 entidades via `src/admin/entities/`).
- `supabase/schema.sql` — schema completo do banco (tabelas, RLS, storage).
