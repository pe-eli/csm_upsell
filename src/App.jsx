import { useEffect } from 'react';
import config from '../config.js';
import { trackOfferView } from './meta-pixel.js';

function safeUrl(value) {
  if (typeof value !== 'string' || !value || /[\s\\\[\]]/.test(value)) return undefined;
  if (/^\/(?!\/)/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
const priceValid = Number.isFinite(config.PRECO_UPSELL) && config.PRECO_UPSELL > 0;
const price = priceValid ? config.PRECO_UPSELL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço a confirmar';
const checkout = priceValid ? safeUrl(config.URL_CHECKOUT_UPSELL) : undefined;
const pending = [
  !checkout && 'Preço e checkout do método',
  !config.FORMA_DE_ACESSO && '[FORMA_DE_ACESSO]',
  !config.PRAZO_DE_LIBERACAO && '[PRAZO_DE_LIBERAÇÃO]',
].filter(Boolean);

function PurchaseLink() {
  const buttonPrice = priceValid ? config.PRECO_UPSELL.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : '—';
  return <a className="button" data-checkout href={checkout} aria-disabled={checkout ? undefined : true}>Quero o Método Emprego Rápido por R$ {buttonPrice} <span aria-hidden="true">↗</span></a>;
}

export default function App() {
  useEffect(() => {
    trackOfferView();
  }, []);

  return <>

  <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div className="topbar"><span className="little-star" aria-hidden="true">✳</span> Antes de seguir: um complemento para o próximo passo da sua busca</div>
  <main id="conteudo">
    <section className="hero wrap" aria-labelledby="titulo">
      <div className="hero-copy">
        <p className="eyebrow"><span className="dot"></span> SEU KIT É O PONTO DE PARTIDA</p>
        <h1 id="titulo">Seu currículo é o começo. <em>Agora, prepare-se para o que vem depois.</em></h1>
        <p className="intro">Você escolheu o Kit Currículo Sob Medida para cuidar da sua candidatura. Aproveite esse passo para ampliar sua preparação: adicione o <strong>Método Emprego Rápido</strong>, um método em formato digital de 39 páginas que conecta a busca por vagas à preparação para entrevistas.</p>
        <p className="author-inline">Orientação de uma recrutadora com <strong>vasta experiência em entrevistas e contratações.</strong></p>
        <p className="optional">Um complemento para a escolha que você já fez. A compra é adicional e opcional; você pode continuar apenas com o Kit.</p>
        <ul className="benefits">
          <li>Depois do currículo: saiba onde concentrar sua busca.</li>
          <li>No LinkedIn: apresente sua trajetória com mais clareza.</li>
          <li>Na entrevista: organize exemplos antes de precisar responder.</li>
        </ul>
        <div className="decision">
          <p className="price">Adicione o método por <strong data-price>{price}</strong></p><p className="price-note">Compra adicional e opcional. Seu acesso ao Kit Currículo Sob Medida permanece independente.</p>
          <PurchaseLink />
          <p className="micro">A compra do método é opcional e não altera seu acesso ao Kit.</p>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-top"><span>COMBINE COM O SEU KIT DE CURRÍCULO</span><span aria-hidden="true">↗</span></div>
        <div className="orbit orbit-one" aria-hidden="true"></div><div className="orbit orbit-two" aria-hidden="true"></div>
        <div className="book" role="img" aria-label="Representação tipográfica da capa: Método Emprego Rápido, método digital de 39 páginas.">
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
        <div className="author-highlight">
          <span className="author-label">A EXPERIÊNCIA DE QUEM CONTRATA</span>
          <strong>Escrito por uma recrutadora.</strong>
          <p>Com vasta experiência em entrevistas e contratações.</p>
        </div>
        <p className="mockup-note">Representação ilustrativa da capa.</p>
      </div>
    </section>

    <section className="bridge section wrap" aria-labelledby="ponte-titulo">
      <div className="section-heading"><p className="eyebrow">PENSE NO QUE VEM DEPOIS</p><h2 id="ponte-titulo">E quando o recrutador chamar?<br /><span>Comece a se preparar agora.</span></h2></div>
      <div className="bridge-copy"><p>Quais experiências você vai destacar? Como vai contar seus resultados? Seu Kit ajuda a adaptar e revisar o currículo. O método complementa esse trabalho com orientações para apresentar sua trajetória, encontrar oportunidades e organizar respostas para as entrevistas. Aproveite o momento de cuidar do currículo para pensar também nessas próximas conversas.</p></div>
      <div className="bridge-cards">
        <article className="bridge-card"><span className="tile-icon" aria-hidden="true">▤</span><div><p className="small-label">SEUS MATERIAIS PRÁTICOS</p><h3>Kit Currículo Sob Medida</h3><p>Materiais para adaptar e revisar o currículo.</p><p className="card-detail">Modelo editável, roteiro de análise da vaga, ficha de resultados e conquistas e checklist final da candidatura.</p></div></article>
        <article className="bridge-card complement"><span className="tile-icon" aria-hidden="true">↗</span><div><p className="small-label">SEU COMPLEMENTO OPCIONAL</p><h3>Método Emprego Rápido</h3><p>Orientação para organizar a busca e se preparar para as próximas etapas.</p><p className="card-detail">Um método para conectar objetivo profissional, oportunidades e preparação para entrevistas.</p></div></article>
      </div>
    </section>

    <section className="contents section" aria-labelledby="conteudos-titulo"><div className="wrap">
      <div className="contents-heading"><div><p className="eyebrow">POR DENTRO DO MÉTODO</p><h2 id="conteudos-titulo">O que você vai encontrar no<br />Método Emprego Rápido</h2></div><p>Seis assuntos conectados.<br /><strong>Todos em um único método de 39 páginas.</strong></p></div>
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
      <div className="offer-intro"><p className="eyebrow">LEVE ESSE PRÓXIMO PASSO COM VOCÊ</p><h2 id="oferta-titulo">Já que você está cuidando do currículo, prepare também o próximo passo<span className="green-period">.</span></h2><p>Adicione o método ao que você já escolheu e siga com os materiais do Kit e uma orientação mais ampla para buscar vagas, apresentar sua trajetória e se preparar para entrevistas.</p><div className="offer-note"><span aria-hidden="true">↗</span><p>Você escolhe como continuar.<br /><strong>Seu Kit pode ser usado independentemente.</strong></p></div></div>
      <div className="offer-card"><div className="offer-card-top"><span className="small-label">COMPLEMENTO OPCIONAL</span><span className="format-pill">Método digital · 39 páginas</span></div><h3>Método Emprego Rápido</h3><p className="offer-author">Escrito por uma recrutadora com vasta experiência em entrevistas e contratações.</p><p className="offer-summary">Objetivo profissional, currículo, LinkedIn, oportunidades, entrevistas e desenvolvimento após a contratação.</p><div className="offer-divider"></div><p className="price">Adicione o método por <strong data-price>{price}</strong></p><p className="price-note">Compra adicional e opcional. Seu acesso ao Kit Currículo Sob Medida permanece independente.</p><p className="access">Forma de acesso: <span data-access>{config.FORMA_DE_ACESSO || "[FORMA_DE_ACESSO]"}</span></p>{config.CONDICOES_DE_GARANTIA && <p className="access">{config.CONDICOES_DE_GARANTIA}</p>}<PurchaseLink /><p className="micro">A compra do método é opcional e não altera seu acesso ao Kit.</p></div>
    </section>

    <section className="faq section wrap" aria-labelledby="faq-titulo"><div><p className="eyebrow">ANTES DE DECIDIR</p><h2 id="faq-titulo">Alguma dúvida?</h2><p>Respostas diretas para você<br />escolher com tranquilidade.</p></div><div className="questions">
      <details><summary>Já comprei o Kit. Qual é a diferença?<span aria-hidden="true">+</span></summary><p>O Kit reúne materiais práticos para adaptar e revisar seu currículo. O método amplia a orientação para objetivo profissional, LinkedIn, busca de vagas, entrevistas e desenvolvimento depois da contratação.</p></details>
      <details><summary>Preciso comprar o método para usar o Kit?<span aria-hidden="true">+</span></summary><p>Não. O Kit pode ser usado independentemente. O método é um complemento opcional e não altera seu acesso aos materiais do Kit.</p></details>
      <details><summary>Qual é o formato do método?<span aria-hidden="true">+</span></summary><p>O método é um material de leitura digital de 39 páginas. Não inclui aulas nem acompanhamento individual nesta oferta.</p></details>
      <details><summary>O método garante emprego?<span aria-hidden="true">+</span></summary><p>Não. O conteúdo orienta a preparação e a busca; decisões de contratação e prazos dependem de diversos fatores. Método Emprego Rápido é o nome do produto, não uma promessa de contratação em determinado prazo.</p></details>
      <details><summary>Como recebo o método?<span aria-hidden="true">+</span></summary><p>Forma de acesso: <span data-access>{config.FORMA_DE_ACESSO || "[FORMA_DE_ACESSO]"}</span>.<br />Prazo de liberação: <span data-release>{config.PRAZO_DE_LIBERACAO || "[PRAZO_DE_LIBERAÇÃO]"}</span>.</p></details>
    </div></section>
  </main>
  <footer className="wrap"><div className="footer-brand"><span aria-hidden="true">✳</span> Método Emprego Rápido</div><p>Um complemento para sua trajetória profissional.</p><span>Método digital · 39 páginas</span></footer>
  {pending.length > 0 && <aside className="review-note wrap" id="revisao" aria-label="Pendências da versão de revisão"><strong>Versão de revisão</strong><p id="review-message">Campos pendentes: {pending.join(', ')}.</p></aside>}

  </>;
}
