import config from '../config.js';

function safeUrl(value) {
  if (typeof value !== 'string' || !value || /[\s\\\[\]]/.test(value)) return undefined;
  if (/^\/(?!\/)/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
const priceValid = Number.isFinite(config.PRECO_UPSELL) && config.PRECO_UPSELL > 0;
const price = priceValid ? config.PRECO_UPSELL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço a confirmar';
const checkout = priceValid ? safeUrl(config.URL_CHECKOUT_UPSELL) : undefined;
const kit = safeUrl(config.URL_CONTINUAR_KIT);
const pending = [
  !checkout && 'Preço e checkout do ebook',
  !kit && '[URL_CONTINUAR_KIT]',
  !config.FORMA_DE_ACESSO && '[FORMA_DE_ACESSO]',
  !config.PRAZO_DE_LIBERACAO && '[PRAZO_DE_LIBERAÇÃO]',
].filter(Boolean);

function PurchaseLink() {
  const buttonPrice = priceValid ? config.PRECO_UPSELL.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '—';
  return <a className="button" data-checkout href={checkout} aria-disabled={checkout ? undefined : true}>Quero o Método Emprego Rápido por R$ {buttonPrice} <span aria-hidden="true">↗</span></a>;
}
function KitLink() {
  return <a className="decline" data-kit href={kit} role={kit ? undefined : 'link'} tabIndex={kit ? undefined : 0} aria-disabled={kit ? undefined : true} aria-describedby={kit ? undefined : 'review-message'} title={kit ? undefined : 'Destino de acesso ao Kit ainda a definir.'}>Continuar apenas com meu Kit <span aria-hidden="true">→</span></a>;
}

export default function App() {
  return <>

  <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div className="topbar"><span className="little-star" aria-hidden="true">✳</span> Uma opção para complementar seu Kit Currículo Sob Medida</div>
  <main id="conteudo">
    <section className="hero wrap" aria-labelledby="titulo">
      <div className="hero-copy">
        <p className="eyebrow"><span className="dot"></span> EBOOK MÉTODO EMPREGO RÁPIDO</p>
        <h1 id="titulo">Seu próximo passo: <em>organizar a busca por vagas</em> e se preparar para as entrevistas.</h1>
        <p className="intro">Complemente seu Kit Currículo Sob Medida com um ebook de 39 páginas sobre objetivo profissional, LinkedIn, busca de oportunidades e preparação para entrevistas.</p>
        <p className="optional">O ebook abaixo é uma compra adicional e opcional. Você pode continuar apenas com o seu Kit.</p>
        <ul className="benefits">
          <li>Mais clareza sobre quais oportunidades buscar.</li>
          <li>Orientação para apresentar sua trajetória no LinkedIn.</li>
          <li>Um caminho para estruturar suas respostas nas entrevistas.</li>
        </ul>
        <div className="decision">
          <p className="price">Adicione o ebook por <strong data-price>{price}</strong></p><p className="price-note">Compra adicional e opcional. Seu acesso ao Kit Currículo Sob Medida permanece independente.</p>
          <PurchaseLink />
          <KitLink />
          <p className="micro">A compra do ebook é opcional e não altera seu acesso ao Kit.</p>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-top"><span>UM GUIA PARA SUA PRÓXIMA ETAPA</span><span aria-hidden="true">↗</span></div>
        <div className="orbit orbit-one" aria-hidden="true"></div><div className="orbit orbit-two" aria-hidden="true"></div>
        <div className="book" role="img" aria-label="Representação tipográfica da capa: Método Emprego Rápido, ebook digital de 39 páginas.">
          <div className="book-spine" aria-hidden="true"></div>
          <div className="book-cover">
            <div className="cover-top"><span>UM PRÓXIMO PASSO<br />NA SUA TRAJETÓRIA</span><span className="cover-symbol" aria-hidden="true">✳</span></div>
            <div className="cover-title">Método<br />Emprego<br /><span>Rápido.</span></div>
            <div className="cover-line"></div>
            <p className="cover-subtitle">Clareza para a busca.<br />Preparação para o próximo passo.</p>
            <div className="stairs" aria-hidden="true"><i></i><i></i><i></i><span>↗</span></div>
            <div className="cover-bottom"><span>GUIA DIGITAL</span><span>39 PÁGINAS</span></div>
          </div>
        </div>
        <div className="visual-bottom"><span className="page-icon" aria-hidden="true">▤</span><span>Um ebook. Uma visão mais ampla.<small>Da definição de objetivo à nova etapa profissional.</small></span></div>
        <p className="mockup-note">Representação ilustrativa da capa.</p>
      </div>
    </section>

    <section className="bridge section wrap" aria-labelledby="ponte-titulo">
      <div className="section-heading"><p className="eyebrow">SEU KIT + UM NOVO OLHAR</p><h2 id="ponte-titulo">O currículo é uma etapa.<br /><span>A busca continua depois dele.</span></h2></div>
      <div className="bridge-copy"><p>Com o Kit Currículo Sob Medida, você tem materiais para adaptar seu currículo a cada oportunidade. O Método Emprego Rápido amplia essa preparação com orientações sobre onde buscar vagas, como apresentar sua trajetória no LinkedIn e como se preparar para conversar com recrutadores.</p></div>
      <div className="bridge-cards">
        <article className="bridge-card"><span className="tile-icon" aria-hidden="true">▤</span><div><p className="small-label">SEUS MATERIAIS PRÁTICOS</p><h3>Kit Currículo Sob Medida</h3><p>Materiais para adaptar e revisar o currículo.</p><p className="card-detail">Modelo editável, roteiro de análise da vaga, ficha de resultados e conquistas e checklist final da candidatura.</p></div></article>
        <article className="bridge-card complement"><span className="tile-icon" aria-hidden="true">↗</span><div><p className="small-label">SEU COMPLEMENTO OPCIONAL</p><h3>Método Emprego Rápido</h3><p>Orientação para organizar a busca e se preparar para as próximas etapas.</p><p className="card-detail">Um ebook para conectar objetivo profissional, oportunidades e preparação para entrevistas.</p></div></article>
      </div>
    </section>

    <section className="contents section" aria-labelledby="conteudos-titulo"><div className="wrap">
      <div className="contents-heading"><div><p className="eyebrow">POR DENTRO DO EBOOK</p><h2 id="conteudos-titulo">O que você vai encontrar no<br />Método Emprego Rápido</h2></div><p>Seis assuntos conectados.<br /><strong>Todos em um único ebook de 39 páginas.</strong></p></div>
      <div className="topics">
        <article className="topic"><span className="topic-number">01 <span aria-hidden="true">↗</span></span><h3>Objetivo profissional</h3><p>Orientação para definir o foco da busca e ter mais clareza sobre quais oportunidades procurar.</p></article>
        <article className="topic"><span className="topic-number">02 <span aria-hidden="true">↗</span></span><h3>Currículo</h3><p>Orientações que complementam o uso dos materiais do seu Kit Currículo Sob Medida.</p></article>
        <article className="topic"><span className="topic-number">03 <span aria-hidden="true">↗</span></span><h3>LinkedIn e recrutadores</h3><p>Como apresentar sua trajetória e orientar seus contatos profissionais.</p></article>
        <article className="topic"><span className="topic-number">04 <span aria-hidden="true">↗</span></span><h3>Empresas e plataformas de vagas</h3><p>Direcionamento para escolher onde procurar oportunidades alinhadas ao seu objetivo.</p></article>
        <article className="topic"><span className="topic-number">05 <span aria-hidden="true">↗</span></span><h3>Preparação para entrevistas</h3><p>A técnica STAR para organizar exemplos da sua experiência em situação, tarefa, ação e resultado.</p></article>
        <article className="topic"><span className="topic-number">06 <span aria-hidden="true">↗</span></span><h3>Depois da contratação</h3><p>Orientações sobre desenvolvimento profissional para seguir aprendendo na nova etapa.</p></article>
      </div>
    </div></section>

    <section className="offer-section section wrap" aria-labelledby="oferta-titulo">
      <div className="offer-intro"><p className="eyebrow">PARA SEGUIR COM MAIS DIREÇÃO</p><h2 id="oferta-titulo">Adicione orientação para os próximos passos da sua busca<span className="green-period">.</span></h2><p>Tenha seus materiais de currículo e uma orientação mais ampla para seguir com a busca.</p><div className="offer-note"><span aria-hidden="true">↗</span><p>Você escolhe como continuar.<br /><strong>Seu Kit pode ser usado independentemente.</strong></p></div></div>
      <div className="offer-card"><div className="offer-card-top"><span className="small-label">COMPLEMENTO OPCIONAL</span><span className="format-pill">Ebook digital · 39 páginas</span></div><h3>Método Emprego Rápido</h3><p className="offer-summary">Objetivo profissional, currículo, LinkedIn, oportunidades, entrevistas e desenvolvimento após a contratação.</p><div className="offer-divider"></div><p className="price">Adicione o ebook por <strong data-price>{price}</strong></p><p className="price-note">Compra adicional e opcional. Seu acesso ao Kit Currículo Sob Medida permanece independente.</p><p className="access">Forma de acesso: <span data-access>{config.FORMA_DE_ACESSO || "[FORMA_DE_ACESSO]"}</span></p>{config.CONDICOES_DE_GARANTIA && <p className="access">{config.CONDICOES_DE_GARANTIA}</p>}<PurchaseLink /><KitLink /><p className="micro">A compra do ebook é opcional e não altera seu acesso ao Kit.</p></div>
    </section>

    <section className="faq section wrap" aria-labelledby="faq-titulo"><div><p className="eyebrow">ANTES DE DECIDIR</p><h2 id="faq-titulo">Alguma dúvida?</h2><p>Respostas diretas para você<br />escolher com tranquilidade.</p></div><div className="questions">
      <details><summary>Já comprei o Kit. Qual é a diferença?<span aria-hidden="true">+</span></summary><p>O Kit reúne materiais práticos para adaptar e revisar seu currículo. O ebook amplia a orientação para objetivo profissional, LinkedIn, busca de vagas, entrevistas e desenvolvimento depois da contratação.</p></details>
      <details><summary>Preciso comprar o ebook para usar o Kit?<span aria-hidden="true">+</span></summary><p>Não. O Kit pode ser usado independentemente. O ebook é um complemento opcional e não altera seu acesso aos materiais do Kit.</p></details>
      <details><summary>É um ebook ou um curso?<span aria-hidden="true">+</span></summary><p>É um ebook digital de 39 páginas. Não há aulas ou acompanhamento individual informados nesta oferta.</p></details>
      <details><summary>O método garante emprego?<span aria-hidden="true">+</span></summary><p>Não. O conteúdo orienta a preparação e a busca; decisões de contratação e prazos dependem de diversos fatores. Método Emprego Rápido é o nome do produto, não uma promessa de contratação em determinado prazo.</p></details>
      <details><summary>Como recebo o ebook?<span aria-hidden="true">+</span></summary><p>Forma de acesso: <span data-access>{config.FORMA_DE_ACESSO || "[FORMA_DE_ACESSO]"}</span>.<br />Prazo de liberação: <span data-release>{config.PRAZO_DE_LIBERACAO || "[PRAZO_DE_LIBERAÇÃO]"}</span>.</p></details>
    </div></section>
  </main>
  <footer className="wrap"><div className="footer-brand"><span aria-hidden="true">✳</span> Método Emprego Rápido</div><p>Um complemento para sua trajetória profissional.</p><span>Ebook digital · 39 páginas</span></footer>
  {pending.length > 0 && <aside className="review-note wrap" id="revisao" aria-label="Pendências da versão de revisão"><strong>Versão de revisão</strong><p id="review-message">Campos pendentes: {pending.join(', ')}. O link de continuidade para o Kit será habilitado quando seu destino for informado.</p></aside>}

  </>;
}
