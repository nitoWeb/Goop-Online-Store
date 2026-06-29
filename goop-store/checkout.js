const checkoutItens = document.getElementById('checkoutItens');
const checkoutTotal = document.getElementById('checkoutTotal');
const formCheckout = document.getElementById('formCheckout');

function pegarCarrinhoCheckout() {
  return JSON.parse(localStorage.getItem('goopCarrinho')) || [];
}

function salvarPedido(pedido) {
  const pedidos = JSON.parse(localStorage.getItem('goopPedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('goopPedidos', JSON.stringify(pedidos));
}

function calcularTotal(carrinho) {
  return carrinho.reduce((total, item) => {
    const precoNumero = parseFloat(
      item.preco.replace('R$', '').replace(/\./g, '').replace(',', '.')
    ) || 0;

    return total + precoNumero;
  }, 0);
}

function renderCheckout() {
  if (!checkoutItens || !checkoutTotal) return;

  const carrinho = pegarCarrinhoCheckout();
  checkoutItens.innerHTML = '';

  if (carrinho.length === 0) {
    checkoutItens.innerHTML = `
      <p style="color:#777; font-size:13px; line-height:1.6;">
        Seu carrinho está vazio.
      </p>
    `;
    checkoutTotal.textContent = 'Total: R$0,00';
    return;
  }

  carrinho.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('checkout-item');

    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <p>${item.nome}</p>
        <p>${item.preco}</p>
        <p>${item.tamanho ? `Tamanho: ${item.tamanho}` : 'Tamanho único'}</p>
      </div>
    `;

    checkoutItens.appendChild(div);
  });

  const total = calcularTotal(carrinho);
  checkoutTotal.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;
}

if (formCheckout) {
  formCheckout.addEventListener('submit', (e) => {
    e.preventDefault();

    const carrinho = pegarCarrinhoCheckout();

    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const endereco = document.getElementById('endereco');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');
    const cep = document.getElementById('cep');

    if (!nome.value || !email.value || !endereco.value || !cidade.value || !cep.value) {
      alert('Preencha todos os campos obrigatórios antes de confirmar o pedido.');
      return;
    }

    const total = calcularTotal(carrinho);

    const pedido = {
      id: 'GOOP-' + Date.now(),
      data: new Date().toLocaleString('pt-BR'),
      cliente: {
        nome: nome.value.trim(),
        email: email.value.trim(),
        telefone: telefone.value.trim(),
        endereco: endereco.value.trim(),
        cidade: cidade.value.trim(),
        estado: estado.value.trim(),
        cep: cep.value.trim()
      },
      itens: carrinho,
      total: `R$${total.toFixed(2).replace('.', ',')}`,
      status: 'Pedido confirmado'
    };

    salvarPedido(pedido);

    localStorage.setItem('goopUltimoPedido', JSON.stringify(pedido));

    localStorage.setItem('goopConta', JSON.stringify({
      nome: nome.value.trim(),
      email: email.value.trim()
    }));

    localStorage.removeItem('goopCarrinho');
    window.location.href = 'sucesso.html';
  });
}

renderCheckout();