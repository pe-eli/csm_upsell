# Verificação da versão de revisão

## Pixel da Meta — 24/09/2026

- Auditoria anterior à alteração: sem `fbq`, GTM, `dataLayer`, scripts ou requisições da Meta no código e na página publicada.
- Pixel instalado: `1120520213871385`, bootstrap oficial assíncrono e imagem `noscript` para `PageView`.
- `npm run build` aprovado; dois testes Playwright aprovados usando Chrome instalado.
- Testes com a biblioteca da Meta interceptada validaram um `PageView` e um `ViewContent` com os parâmetros solicitados, inclusive em StrictMode, renderizações, remontagens e repetição do bootstrap. Nova navegação gera uma nova dupla de eventos.
- Fallback `noscript` testado com JavaScript desativado: uma requisição `PageView` com o ID correto.
- Clique do botão testado com checkout interceptado: navega ao destino correto sem `Purchase`, `InitiateCheckout` ou `AddToCart`. Nenhum pagamento foi realizado.
- Produção em `https://csm-upsell.vercel.app/`: biblioteca e configuração do Pixel responderam HTTP 200; uma única tag `fbevents.js`; estado da biblioteca identificou o Pixel correto e `eventCount: 2`; sem erros de JavaScript. Ambos os links de compra preservados.
- Limite da verificação: no navegador automatizado não foram observadas requisições de coleta `/tr`. Portanto, não foi confirmado o recebimento no Gerenciador de Eventos. É necessário conferir em **Testar Eventos** na conta Meta, incluindo permissões de tráfego do domínio e eventuais regras externas. Não há evidência suficiente para atribuir a ausência de coleta a uma configuração específica. A integração Cakto não foi alterada.

## Atualização comercial

Preço definitivo de R$ 47,00 e checkout https://pay.cakto.com.br/xzi9krb_1005370 configurados. Os dois botões usam “Quero o Método Emprego Rápido por R$ 47”, com o aviso de compra adicional e opcional próximo a cada preço. Verificação do HTML e execução de `config.js`/`app.js` em ambiente DOM simulado confirmaram ambos os links habilitados e a continuidade para o Kit ainda desabilitada por falta de destino. Sintaxe JavaScript validada. Nenhuma compra realizada. As verificações abaixo registram a versão inicial, anterior à definição comercial.

Conferência local realizada em navegador Chromium com agent-browser.

- Página carregou em `http://127.0.0.1:4173/`; nenhum erro de execução da página foi reportado pelo navegador.
- Layout inspecionado em 1440 × 1000 e 375 × 812. No celular, a largura do conteúdo foi 375 px, sem transbordamento horizontal.
- Capturas: `desktop.png`, `mobile.png` e `mobile-full.png`.
- Quatro links comerciais sem configuração identificados como desabilitados.
- FAQ abriu e fechou corretamente.
- Com configuração temporária apenas na memória do navegador, o link do Kit funcionou mesmo sem preço do ebook; o checkout permaneceu desabilitado.
- Com preço e destinos de teste, os dois links de checkout receberam o destino correto, o preço foi formatado em reais e a nota de revisão desapareceu quando os campos obrigatórios foram preenchidos.
- A navegação do Kit foi exercitada usando uma âncora local de teste. O checkout externo não foi aberto e nenhuma cobrança foi feita.
- A página foi recarregada após o teste. `config.js` permanece com todos os campos comerciais pendentes.
- `node --check` aprovou a sintaxe de `app.js` e `config.js`.

Limite: checkout real, entrega, aprovação de pagamento e acesso real ao Kit não podem ser verificados sem dados comerciais e integração fornecidos.

## Migração para React + Vite

`npm install` concluído sem vulnerabilidades reportadas e `npm run build` aprovado. `npm run dev` iniciou em http://127.0.0.1:5173. Verificação no Chromium em 375 px confirmou ausência de transbordamento, FAQ abrindo, dois CTAs com o texto e checkout corretos e ambos os links do Kit desabilitados enquanto o destino permanece pendente. Nenhum erro de execução da página reportado pelo navegador.
