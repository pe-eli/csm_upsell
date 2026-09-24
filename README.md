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

## Pixel da Meta

Pixel `1120520213871385`: código-base assíncrono em `index.html`, com `PageView` e fallback `noscript`. `src/meta-pixel.js` envia `ViewContent` após a renderização da oferta, com produto `metodo_emprego_rapido`, valor 47 e moeda BRL. O estado por documento evita repetições no StrictMode, em novas renderizações e remontagens. Recarregar/navegar para um novo documento gera uma nova visualização.

Antes da instalação, a inspeção do código e do site publicado não encontrou `fbq`, gerenciador de tags ou requisições da Meta. O carregador oficial reutiliza `fbq` se disponível. Não instale uma segunda tag pelo GTM ou outro integrador. Não existem eventos de compra ou checkout nos botões. A configuração automática do Pixel está desativada nesta instalação (`autoConfig: false`).

No Gerenciador de Eventos da Meta, confirme o recebimento em Testar Eventos e confira se há regras externas da Ferramenta de Configuração de Eventos ou permissões de tráfego para o domínio. Checkout e pagamento continuam sob responsabilidade da Cakto; sua configuração externa não foi alterada.

Testes de rastreamento:

```sh
npx playwright install chromium
npm test
```

Também é possível usar Chrome instalado, definindo `PLAYWRIGHT_CHANNEL=chrome`. Os testes interceptam a Meta e o checkout para conferir eventos e navegação sem gerar compras nem eventos de teste reais.
