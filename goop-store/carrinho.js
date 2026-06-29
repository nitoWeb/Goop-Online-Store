const lista = document.getElementById('listaCarrinho');
const totalEl = document.getElementById('total');

function pegarCarrinho() {
  const carrinho = localStorage.getItem('goopCarrinho');
  return carrinho ? JSON.parse(carrinho) : [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('goopCarrinho', JSON.stringify(carrinho));
}

function renderizarCarrinho() {
  const carrinho = pegarCarrinho();

  lista.innerHTML = '';

  let total = 0;

  carrinho.forEach((item, index) => {
    const precoNumero = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    total += precoNumero;

    const div = document.createElement('div');
    div.classList.add('item-carrinho');

    div.innerHTML = `
      <img src="${item.imagem}">
      <div class="item-info">
        <h3>${item.nome}</h3>
        <p>${item.preco}</p>
        <p>Tamanho: ${item.tamanho}</p>
      </div>
      <button class="remover" onclick="removerItem(${index})">Remover</button>
    `;

    lista.appendChild(div);
  });

  totalEl.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
  const carrinho = pegarCarrinho();
  carrinho.splice(index, 1);
  salvarCarrinho(carrinho);
  renderizarCarrinho();
}

renderizarCarrinho();