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

## Deploy (GitHub Pages + domínio próprio)

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a
cada push na branch `main`. O projeto está configurado para publicar na
**raiz de um domínio próprio** (`vite.config.js` define `base: '/'`), não
mais no subcaminho `usuario.github.io/repositorio/`.

Passos únicos, feitos manualmente por você:

1. Em **Settings → Pages**, em "Build and deployment", selecione a fonte
   **GitHub Actions**.
2. Em **Settings → Secrets and variables → Actions**, adicione dois
   repository secrets: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (os
   mesmos valores do seu `.env`).
3. O domínio já está configurado em `public/CNAME`:
   `sindicondominiospi.com.br` (esse arquivo é copiado para o build e diz
   ao GitHub Pages qual domínio customizado servir).
4. No provedor onde o domínio foi comprado, aponte o DNS para o GitHub
   Pages:
   - Domínio raiz (`sindicondominiospi.com.br`): registros **A** apontando
     para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e
     `185.199.111.153`.
   - Subdomínio (`www.sindicondominiospi.com.br`): registro **CNAME**
     apontando para `victorrafaelsm15.github.io`.
5. Em **Settings → Pages → Custom domain**, digite o mesmo domínio e
   aguarde a verificação (pode levar algumas horas pela propagação de DNS).
   Depois de verificado, marque **Enforce HTTPS**.
6. Faça push para `main` — o workflow builda e publica automaticamente no
   domínio configurado.

O projeto já inclui o ajuste necessário para SPA em GitHub Pages
(`public/404.html` + script em `index.html`, técnica
[spa-github-pages](https://github.com/rafgraph/spa-github-pages)), então
qualquer rota interna (`/noticias`, `/admin/login`, `/admin/eventos` etc.)
funciona normalmente mesmo com acesso direto pela URL ou F5 na página.

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
