/* Preencha somente com informações comerciais confirmadas.
   URLs: endereço HTTPS completo ou caminho local iniciado com uma única barra.
   Não use parâmetros da URL como confirmação de pagamento.
   A página não confirma o pagamento do Kit: isso exige integração verificada no servidor. */
export default Object.freeze({
  PRECO_UPSELL: 47, // Preço adicional confirmado, em reais.
  URL_CHECKOUT_UPSELL: "https://pay.cakto.com.br/xzi9krb_1005370",
  FORMA_DE_ACESSO: "Acesso digital vitalício ao método.",
  PRAZO_DE_LIBERACAO: "Imediato após a confirmação do pagamento",
  CONDICOES_DE_GARANTIA: "Você pode solicitar reembolso em até 7 dias após a compra."
});
