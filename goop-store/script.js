// REVEAL
const reveals = document.querySelectorAll('.reveal');

if (reveals.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((item) => observer.observe(item));
}

// HEADER SHADOW
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});

// STORAGE DO CARRINHO
function pegarCarrinho() {
  return JSON.parse(localStorage.getItem('goopCarrinho')) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('goopCarrinho', JSON.stringify(carrinho));
}

// ELEMENTOS GERAIS
const carrinhoLateral = document.getElementById('carrinhoLateral');
const overlay = document.getElementById('overlay');
const abrirCarrinho = document.getElementById('abrirCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');
const cartCount = document.getElementById('cartCount');

const imagemPrincipal = document.getElementById('imagemPrincipal');
const miniaturas = document.querySelectorAll('.miniatura');
const miniatura1 = document.getElementById('miniatura1');
const miniatura2 = document.getElementById('miniatura2');

const produtoNome = document.getElementById('produtoNome');
const produtoPreco = document.getElementById('produtoPreco');
const produtoDescricao = document.getElementById('produtoDescricao');
const produtoMarca = document.getElementById('produtoMarca');
const blocoTamanhos = document.getElementById('blocoTamanhos');
const tamanhos = document.querySelectorAll('.tamanho');
const botaoComprar = document.getElementById('botaoComprar');
const infosExtra = document.getElementById('infosExtra');

// VARIÁVEIS DO PRODUTO
let tamanhoSelecionado = null;
let produtoTemTamanho = true;

// URL PARAMS PRODUTO
const params = new URLSearchParams(window.location.search);
const temParamsProduto = params.has('nome');

if (temParamsProduto) {
  const nome = params.get('nome');
  const preco = params.get('preco');
  const img1 = params.get('img1');
  const img2 = params.get('img2');
  const descricao = params.get('descricao');
  const tamanhosParam = params.get('tamanhos');
  const info1 = params.get('info1');
  const info2 = params.get('info2');
  const info3 = params.get('info3');

  produtoTemTamanho = tamanhosParam !== 'nao';

  if (produtoNome && nome) produtoNome.textContent = nome;
  if (produtoPreco && preco) produtoPreco.textContent = preco;
  if (produtoDescricao && descricao) produtoDescricao.textContent = descricao;
  if (produtoMarca) produtoMarca.textContent = 'GOOP STUDIOS';

  if (imagemPrincipal && img1) {
    imagemPrincipal.src = img1;
    imagemPrincipal.alt = nome || 'Produto GOOP';
  }

  if (miniatura1 && img1) {
    miniatura1.src = img1;
    miniatura1.alt = nome || 'Miniatura 1';
  }

  if (miniatura2 && img2) {
    miniatura2.src = img2;
    miniatura2.alt = nome || 'Miniatura 2';
  }

  if (infosExtra) {
    infosExtra.innerHTML = '';
    if (info1) infosExtra.innerHTML += `<p>${info1}</p>`;
    if (info2) infosExtra.innerHTML += `<p>${info2}</p>`;
    if (info3) infosExtra.innerHTML += `<p>${info3}</p>`;
  }

  if (blocoTamanhos && !produtoTemTamanho) {
    blocoTamanhos.style.display = 'none';
  }
}

// BUSCA
const abrirBusca = document.getElementById('abrirBusca');
const fecharBusca = document.getElementById('fecharBusca');
const painelBusca = document.getElementById('painelBusca');
const overlayBusca = document.getElementById('overlayBusca');
const inputBusca = document.getElementById('inputBusca');
const resultadosBusca = document.getElementById('resultadosBusca');
const cardsProdutos = document.querySelectorAll('.product-card');

function abrirPainelBusca() {
  if (painelBusca) painelBusca.classList.add('ativo');
  if (overlayBusca) overlayBusca.classList.add('ativo');

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (inputBusca) inputBusca.focus();
  }, 200);

  renderResultadosBusca('');
}

function fecharPainelBusca() {
  if (painelBusca) painelBusca.classList.remove('ativo');
  if (overlayBusca) overlayBusca.classList.remove('ativo');

  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

function renderResultadosBusca(termo) {
  if (!resultadosBusca) return;

  resultadosBusca.innerHTML = '';

  const cardsArray = Array.from(cardsProdutos);

  const resultados = cardsArray.filter((card) => {
    const texto = (card.dataset.nome || '').toLowerCase();
    return texto.includes(termo.toLowerCase().trim());
  });

  if (termo.trim() === '') {
    resultadosBusca.innerHTML = `<div class="resultado-busca-vazio">Digite para buscar produtos.</div>`;
    return;
  }

  if (resultados.length === 0) {
    resultadosBusca.innerHTML = `<div class="resultado-busca-vazio">Nenhum produto encontrado.</div>`;
    return;
  }

  resultados.forEach((card) => {
    const link = card.querySelector('.product-image');
    const img = card.querySelector('.main-img');
    const titulo = card.querySelector('.product-info h3');
    const preco = card.querySelector('.product-info p');

    if (!link || !img || !titulo || !preco) return;

    const hrefReal = link.getAttribute('href');

    const item = document.createElement('a');
    item.href = hrefReal;
    item.className = 'resultado-busca-item';

    item.innerHTML = `
      <img src="${img.getAttribute('src')}" alt="${titulo.textContent}">
      <div class="resultado-busca-info">
        <h4>${titulo.textContent}</h4>
        <p>${preco.textContent}</p>
      </div>
    `;

    item.addEventListener('click', (e) => {
      e.preventDefault();

      if (pageLoader) {
        pageLoader.classList.remove('esconder');
      }

      setTimeout(() => {
        window.location.href = hrefReal;
      }, 700);
    });

    resultadosBusca.appendChild(item);
  });
}

if (abrirBusca) {
  abrirBusca.addEventListener('click', (e) => {
    e.preventDefault();
    abrirPainelBusca();
  });
}

if (fecharBusca) {
  fecharBusca.addEventListener('click', () => {
    fecharPainelBusca();
  });
}

if (overlayBusca) {
  overlayBusca.addEventListener('click', () => {
    fecharPainelBusca();
  });
}

if (inputBusca) {
  inputBusca.addEventListener('input', () => {
    renderResultadosBusca(inputBusca.value);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    fecharPainelBusca();
  }
});

// TROCA DE IMAGEM DO PRODUTO
if (miniaturas.length > 0 && imagemPrincipal) {
  miniaturas.forEach((miniatura) => {
    miniatura.addEventListener('click', () => {
      imagemPrincipal.src = miniatura.src;

      miniaturas.forEach((item) => item.classList.remove('ativa'));
      miniatura.classList.add('ativa');
    });
  });
}

// MENSAGEM DE CARRINHO VAZIO
const estiloCarrinhoVazio = `
  <div style="padding: 28px 6px; color: #777; font-size: 13px; line-height: 1.6;">
    Seu carrinho está vazio.
  </div>
`;

// CONTADOR
function atualizarContadorCarrinho() {
  const carrinho = pegarCarrinho();
  if (cartCount) {
    cartCount.textContent = carrinho.length;
  }
}

// RENDER DO CARRINHO
function renderCarrinho() {
  if (!itensCarrinho || !totalCarrinho) return;

  const carrinho = pegarCarrinho();
  itensCarrinho.innerHTML = '';

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = estiloCarrinhoVazio;
    totalCarrinho.textContent = 'Total: R$0,00';
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    const precoNumero = parseFloat(
      item.preco.replace('R$', '').replace(/\./g, '').replace(',', '.')
    ) || 0;

    total += precoNumero;

    const div = document.createElement('div');
    div.classList.add('item-carrinho');

    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="item-info">
        <p>${item.nome}</p>
        <p>${item.preco}</p>
        <p>${item.tamanho ? `Tamanho: ${item.tamanho}` : 'Tamanho único'}</p>
      </div>
      <button class="remover" type="button" data-index="${index}">X</button>
    `;

    itensCarrinho.appendChild(div);
  });

  totalCarrinho.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;

  const botoesRemover = document.querySelectorAll('.remover');
  botoesRemover.forEach((botao) => {
    botao.addEventListener('click', () => {
      const index = Number(botao.dataset.index);
      removerItem(index);
    });
  });
}

// REMOVER ITEM
function removerItem(index) {
  const itens = document.querySelectorAll('.item-carrinho');
  const item = itens[index];

  if (item) {
    item.classList.add('removendo');

    setTimeout(() => {
      const carrinho = pegarCarrinho();
      carrinho.splice(index, 1);
      salvarCarrinho(carrinho);
      atualizarContadorCarrinho();
      renderCarrinho();
    }, 280);
  } else {
    const carrinho = pegarCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
    renderCarrinho();
  }
}

// ABRIR / FECHAR CARRINHO
if (abrirCarrinho) {
  abrirCarrinho.addEventListener('click', (e) => {
    e.preventDefault();

    if (carrinhoLateral) carrinhoLateral.classList.add('ativo');
    if (overlay) overlay.classList.add('ativo');

    renderCarrinho();
  });
}

if (fecharCarrinho) {
  fecharCarrinho.addEventListener('click', () => {
    if (carrinhoLateral) carrinhoLateral.classList.remove('ativo');
    if (overlay) overlay.classList.remove('ativo');
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    if (carrinhoLateral) carrinhoLateral.classList.remove('ativo');
    overlay.classList.remove('ativo');
  });
}

// TAMANHOS
if (tamanhos.length > 0) {
  tamanhos.forEach((btn) => {
    btn.addEventListener('click', () => {
      tamanhos.forEach((item) => item.classList.remove('ativo'));
      btn.classList.add('ativo');
      tamanhoSelecionado = btn.textContent.trim();
    });
  });
}

// COMPRAR
if (botaoComprar) {
  botaoComprar.addEventListener('click', () => {
    if (produtoTemTamanho && !tamanhoSelecionado) {
      alert('Selecione um tamanho antes de comprar.');
      return;
    }

    const carrinho = pegarCarrinho();

    const produto = {
      nome: produtoNome ? produtoNome.textContent.trim() : 'Produto GOOP',
      preco: produtoPreco ? produtoPreco.textContent.trim() : 'R$0,00',
      tamanho: produtoTemTamanho ? tamanhoSelecionado : '',
      imagem: imagemPrincipal ? imagemPrincipal.src : ''
    };

    carrinho.push(produto);
    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
    renderCarrinho();

    if (imagemPrincipal && abrirCarrinho) {
      const imgAnimada = imagemPrincipal.cloneNode(true);
      const rectImagem = imagemPrincipal.getBoundingClientRect();
      const rectCarrinho = abrirCarrinho.getBoundingClientRect();

      imgAnimada.style.position = 'fixed';
      imgAnimada.style.left = rectImagem.left + 'px';
      imgAnimada.style.top = rectImagem.top + 'px';
      imgAnimada.style.width = rectImagem.width + 'px';
      imgAnimada.style.height = rectImagem.height + 'px';
      imgAnimada.style.objectFit = 'cover';
      imgAnimada.style.zIndex = '3000';
      imgAnimada.style.pointerEvents = 'none';
      imgAnimada.style.transition = 'all 0.7s ease';

      document.body.appendChild(imgAnimada);

      requestAnimationFrame(() => {
        imgAnimada.style.left = rectCarrinho.left + 'px';
        imgAnimada.style.top = rectCarrinho.top + 'px';
        imgAnimada.style.width = '40px';
        imgAnimada.style.height = '40px';
        imgAnimada.style.opacity = '0.4';
      });

      setTimeout(() => {
        imgAnimada.remove();
        if (carrinhoLateral) carrinhoLateral.classList.add('ativo');
        if (overlay) overlay.classList.add('ativo');
      }, 700);
    } else {
      if (carrinhoLateral) carrinhoLateral.classList.add('ativo');
      if (overlay) overlay.classList.add('ativo');
    }
  });
}

// FADE DE ENTRADA
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// LOADER GOOP
const pageLoader = document.getElementById('pageLoader');

window.addEventListener('load', () => {
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('esconder');
    }, 150);
  }
});

// IR PARA CHECKOUT
document.addEventListener('click', (e) => {
  const botaoCheckout = e.target.closest('.ir-checkout');

  if (botaoCheckout) {
    if (pageLoader) pageLoader.classList.remove('esconder');
    document.body.classList.remove('loaded');

    setTimeout(() => {
      window.location.href = 'checkout.html';
    }, 700);
  }
});

// TRANSIÇÃO ENTRE PÁGINAS
document.querySelectorAll('a:not([data-no-transition])').forEach((link) => {
  const href = link.getAttribute('href');

  if (
    href &&
    !href.startsWith('#') &&
    !href.startsWith('http') &&
    !link.hasAttribute('data-sem-transicao')
  ) {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (pageLoader) pageLoader.classList.remove('esconder');

      setTimeout(() => {
        window.location.href = href;
      }, 700);
    });
  }
});

// CONTA
const abrirConta = document.getElementById('abrirConta');
const fecharConta = document.getElementById('fecharConta');
const painelConta = document.getElementById('painelConta');
const overlayConta = document.getElementById('overlayConta');
const textoContaHeader = document.getElementById('abrirConta');
const conteudoContaOriginal = document.getElementById('conteudoConta')?.innerHTML;

function atualizarHeaderConta() {
  const contaSalva = JSON.parse(localStorage.getItem('goopConta'));

  if (!textoContaHeader) return;

  if (contaSalva && contaSalva.nome) {
    textoContaHeader.textContent = `Olá, ${contaSalva.nome}`;
  } else {
    textoContaHeader.textContent = 'Conta';
  }
}

function abrirPainelConta() {
  if (painelConta) painelConta.classList.add('ativo');
  if (overlayConta) overlayConta.classList.add('ativo');
}

function fecharPainelConta() {
  if (painelConta) painelConta.classList.remove('ativo');
  if (overlayConta) overlayConta.classList.remove('ativo');
}

function carregarConta() {
  const contaSalva = JSON.parse(localStorage.getItem('goopConta'));
  const nomeContaAtual = document.getElementById('nomeConta');
  const emailContaAtual = document.getElementById('emailConta');
  const statusContaAtual = document.getElementById('statusConta');

  if (!contaSalva) {
    if (statusContaAtual) statusContaAtual.textContent = 'Nenhuma conta conectada.';
    return;
  }

  if (nomeContaAtual) nomeContaAtual.value = contaSalva.nome || '';
  if (emailContaAtual) emailContaAtual.value = contaSalva.email || '';

  if (statusContaAtual) {
    statusContaAtual.textContent = `Conectado como ${contaSalva.nome}.`;
  }
}

// FAVORITOS
function pegarFavoritos() {
  return JSON.parse(localStorage.getItem('goopFavoritos')) || [];
}

function salvarFavoritos(lista) {
  localStorage.setItem('goopFavoritos', JSON.stringify(lista));
}

function normalizarFavoritos() {
  let favoritos = pegarFavoritos();

  favoritos = favoritos.map((item) => {
    if (typeof item === 'string') {
      return {
        nome: item,
        titulo: item,
        preco: '',
        imagem: '',
        link: '#'
      };
    }

    return item;
  });

  salvarFavoritos(favoritos);
  return favoritos;
}

function atualizarBotoesFavorito() {
  const favoritos = normalizarFavoritos();

  document.querySelectorAll('.product-card').forEach((card) => {
    const nome = card.dataset.nome;
    const botao = card.querySelector('.favorito-btn');

    if (!botao) return;

    const existe = favoritos.some((item) => item.nome === nome);

    botao.textContent = existe ? '♥' : '♡';
    botao.classList.toggle('ativo', existe);
  });
}

function mostrarFavoritosNaConta() {
  const favoritos = normalizarFavoritos();
  const conteudoConta = document.getElementById('conteudoConta');

  if (!conteudoConta) return;

  if (favoritos.length === 0) {
    conteudoConta.innerHTML = `
      <p class="conta-titulo">Favoritos</p>
      <p class="conta-status">Você ainda não tem favoritos.</p>
      <button class="botao-conta-acao" id="voltarConta">Voltar</button>
    `;
  } else {
    conteudoConta.innerHTML = `
      <p class="conta-titulo">Favoritos</p>
      <div id="listaFavoritos"></div>
      <button class="botao-conta-acao" id="voltarConta">Voltar</button>
    `;

    const listaFavoritos = document.getElementById('listaFavoritos');

    favoritos.forEach((produto, index) => {
      const item = document.createElement('div');

      item.style.display = 'grid';
      item.style.gridTemplateColumns = '64px 1fr auto';
      item.style.alignItems = 'center';
      item.style.gap = '12px';
      item.style.padding = '12px 0';
      item.style.borderBottom = '1px solid rgba(0,0,0,0.08)';

      item.innerHTML = `
        <a href="${produto.link || '#'}">
          <img src="${produto.imagem || ''}" alt="${produto.titulo || produto.nome}" style="width:64px;height:82px;object-fit:cover;background:#f5f5f5;border-radius:8px;">
        </a>

        <div>
          <p style="font-size:12px;font-weight:600;line-height:1.35;margin-bottom:4px;">${produto.titulo || produto.nome}</p>
          <p style="font-size:12px;font-weight:700;">${produto.preco || ''}</p>
        </div>

        <button type="button" data-index="${index}" style="border:none;background:none;color:#b00000;cursor:pointer;font-size:12px;">X</button>
      `;

      listaFavoritos.appendChild(item);
    });

    listaFavoritos.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        let favoritosAtuais = normalizarFavoritos();

        favoritosAtuais.splice(index, 1);
        salvarFavoritos(favoritosAtuais);
        atualizarBotoesFavorito();
        mostrarFavoritosNaConta();
      });
    });
  }

  const voltarConta = document.getElementById('voltarConta');

  if (voltarConta) {
    voltarConta.addEventListener('click', () => {
      if (conteudoContaOriginal) {
        conteudoConta.innerHTML = conteudoContaOriginal;
        conectarEventosConta();
        carregarConta();
      }
    });
  }
}

// PEDIDOS
function pegarPedidos() {
  return JSON.parse(localStorage.getItem('goopPedidos')) || [];
}

function mostrarPedidosNaConta() {
  const pedidos = pegarPedidos();
  const conteudoConta = document.getElementById('conteudoConta');

  if (!conteudoConta) return;

  if (pedidos.length === 0) {
    conteudoConta.innerHTML = `
      <p class="conta-titulo">Meus pedidos</p>
      <p class="conta-status">Você ainda não tem pedidos.</p>
      <button class="botao-conta-acao" id="voltarConta">Voltar</button>
    `;
  } else {
    conteudoConta.innerHTML = `
      <p class="conta-titulo">Meus pedidos</p>
      <div id="listaPedidos" style="display:flex;flex-direction:column;gap:16px;"></div>
      <button class="botao-conta-acao" id="voltarConta">Voltar</button>
    `;

    const listaPedidos = document.getElementById('listaPedidos');

    pedidos.slice().reverse().forEach((pedido) => {
      const pedidoDiv = document.createElement('div');

      pedidoDiv.style.background = 'rgba(255,255,255,0.65)';
      pedidoDiv.style.border = '1px solid rgba(0,0,0,0.08)';
      pedidoDiv.style.borderRadius = '16px';
      pedidoDiv.style.padding = '16px';
      pedidoDiv.style.boxShadow = '0 12px 28px rgba(0,0,0,0.04)';

      const itensHtml = (pedido.itens || []).map((item) => {
        return `
          <div style="display:grid;grid-template-columns:56px 1fr;gap:12px;align-items:center;padding-top:12px;margin-top:12px;border-top:1px solid rgba(0,0,0,0.06);">
            <img src="${item.imagem || ''}" alt="${item.nome || 'Produto'}" style="width:56px;height:72px;object-fit:cover;background:#f5f5f5;border-radius:10px;">
            <div>
              <p style="font-size:12px;font-weight:700;line-height:1.35;">${item.nome || 'Produto GOOP'}</p>
              <p style="font-size:12px;font-weight:700;margin-top:4px;">${item.preco || ''}</p>
              <p style="font-size:11px;color:#777;margin-top:3px;">${item.tamanho ? `Tamanho: ${item.tamanho}` : 'Tamanho único'}</p>
            </div>
          </div>
        `;
      }).join('');

      pedidoDiv.innerHTML = `
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:10px;">
          <div>
            <p style="font-size:11px;color:#777;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:4px;">Pedido</p>
            <p style="font-size:13px;font-weight:800;letter-spacing:.5px;">${pedido.id || 'Pedido GOOP'}</p>
          </div>

          <span style="font-size:10px;text-transform:uppercase;letter-spacing:1px;background:#e8f5e9;color:#2f7d32;padding:7px 10px;border-radius:999px;font-weight:800;white-space:nowrap;">
            ${pedido.status || 'Confirmado'}
          </span>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px;">
          <div>
            <p style="font-size:11px;color:#777;margin-bottom:3px;">Data</p>
            <p style="font-size:12px;font-weight:600;">${pedido.data || ''}</p>
          </div>

          <div>
            <p style="font-size:11px;color:#777;margin-bottom:3px;">Total</p>
            <p style="font-size:13px;font-weight:800;">${pedido.total || 'R$0,00'}</p>
          </div>
        </div>

        ${itensHtml}
      `;

      listaPedidos.appendChild(pedidoDiv);
    });
  }

  const voltarConta = document.getElementById('voltarConta');

  if (voltarConta) {
    voltarConta.addEventListener('click', () => {
      if (conteudoContaOriginal) {
        conteudoConta.innerHTML = conteudoContaOriginal;
        conectarEventosConta();
        carregarConta();
      }
    });
  }
}

function conectarEventosConta() {
  const nomeContaAtual = document.getElementById('nomeConta');
  const emailContaAtual = document.getElementById('emailConta');
  const salvarContaAtual = document.getElementById('salvarConta');
  const sairContaAtual = document.getElementById('sairConta');
  const verPedidosAtual = document.getElementById('verPedidos');
  const verFavoritosAtual = document.getElementById('verFavoritos');
  const statusContaAtual = document.getElementById('statusConta');

  if (salvarContaAtual) {
    salvarContaAtual.addEventListener('click', () => {
      const nome = nomeContaAtual?.value.trim();
      const email = emailContaAtual?.value.trim();

      if (!nome || !email) {
        if (statusContaAtual) statusContaAtual.textContent = 'Preencha nome e e-mail.';
        return;
      }

      localStorage.setItem('goopConta', JSON.stringify({ nome, email }));

      if (statusContaAtual) {
        statusContaAtual.textContent = `Conta salva com sucesso para ${nome}.`;
      }

      atualizarHeaderConta();
    });
  }

  if (sairContaAtual) {
    sairContaAtual.addEventListener('click', () => {
      localStorage.removeItem('goopConta');

      if (nomeContaAtual) nomeContaAtual.value = '';
      if (emailContaAtual) emailContaAtual.value = '';

      if (statusContaAtual) statusContaAtual.textContent = 'Você saiu da conta.';

      atualizarHeaderConta();
    });
  }

  if (verPedidosAtual) {
    verPedidosAtual.addEventListener('click', () => {
      mostrarPedidosNaConta();
    });
  }

  if (verFavoritosAtual) {
    verFavoritosAtual.addEventListener('click', () => {
      mostrarFavoritosNaConta();
    });
  }
}

if (abrirConta) {
  abrirConta.addEventListener('click', (e) => {
    e.preventDefault();
    abrirPainelConta();
    carregarConta();
  });
}

if (fecharConta) {
  fecharConta.addEventListener('click', fecharPainelConta);
}

if (overlayConta) {
  overlayConta.addEventListener('click', fecharPainelConta);
}

document.querySelectorAll('.product-card').forEach((card) => {
  const botao = card.querySelector('.favorito-btn');

  if (!botao) return;

  botao.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nome = card.dataset.nome;
    const titulo = card.querySelector('.product-info h3')?.textContent.trim() || nome;
    const preco = card.querySelector('.product-info p')?.textContent.trim() || '';
    const imagem = card.querySelector('.main-img')?.getAttribute('src') || '';
    const link = card.querySelector('.product-image')?.getAttribute('href') || '#';

    let favoritos = normalizarFavoritos();

    if (favoritos.some((item) => item.nome === nome)) {
      favoritos = favoritos.filter((item) => item.nome !== nome);
    } else {
      favoritos.push({ nome, titulo, preco, imagem, link });
    }

    salvarFavoritos(favoritos);
    atualizarBotoesFavorito();
  });
});

conectarEventosConta();
atualizarBotoesFavorito();
atualizarHeaderConta();
atualizarContadorCarrinho();
renderCarrinho();
