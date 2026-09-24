# Método Emprego Rápido — upsell

Página responsiva em React + Vite, em português do Brasil.

## Desenvolvimento

Requer Node.js 22.12+ ou 24 e npm.

```sh
npm install
npm run dev
```

Acesse http://localhost:5173. A página também está disponível em `/upsell`.

```sh
npm run build
npm run preview
```

O build é gerado em `dist/`. A Vercel usa o preset Vite, conforme `vercel.json`.

## Arquivos

- `src/App.jsx`: componentes, copy e links.
- `styles.css`: layout responsivo e mockup tipográfico.
- `config.js`: dados comerciais centralizados.
- `src/main.jsx`: entrada React.

Preço confirmado: R$ 47,00. Checkout: https://pay.cakto.com.br/xzi9krb_1005370.

Ainda pendentes em `config.js`: `URL_CONTINUAR_KIT`, `FORMA_DE_ACESSO` e `PRAZO_DE_LIBERACAO`. `CONDICOES_DE_GARANTIA` é opcional e permanece omitida enquanto não fornecida.

O link do Kit permanece visível e desabilitado até receber um destino válido. O checkout apenas redireciona; não cobra automaticamente nem confirma compra por clique. A página não confirma pagamento pela simples visita.

A nota de revisão permanece visível enquanto houver campos obrigatórios pendentes. O deploy solicitado publica esta versão; é necessário resolver essas pendências antes de usá-la no fluxo completo pós-compra. A página mantém `noindex, nofollow`.

## Repositório e deploy

Repositório: https://github.com/pe-eli/csm_upsell

Projeto Vercel: `csm-upsell`, conectado ao repositório. Branch de produção: `main`.

Arquivos `.env*`, `.vercel`, dependências e builds são ignorados no Git. `config.js` é público no navegador e não deve conter credenciais.
