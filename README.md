# 🛍️ Goop — E-Commerce de Moda & Vestuário

> Plataforma web moderna e responsiva para a loja de roupas online **Goop**, desenvolvida com foco em usabilidade, performance e integração de pagamentos.

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)

---

## 🌐 Demo Online

🔗 **Acesse a aplicação em produção:** [sitegoop01.vercel.app](https://sitegoop01.vercel.app)

---

## 📌 Sobre o Projeto

O **Goop** é um e-commerce desenvolvido para oferecer uma experiência de compra fluida e intuitiva no segmento de moda e vestuário. O projeto conta com catálogo dinâmico de produtos, carrinho de compras em tempo real, cálculo de frete, filtros avançados por tamanho e categoria, além de integração completa com gateways de pagamento via **Webhooks**.

---

## ✨ Funcionalidades Principais

- 📱 **Interface 100% Responsiva:** Adaptada para navegação em smartphones, tablets e desktops.
- 👗 **Catálogo Interativo:** Filtros por categoria, tamanho, cor, faixa de preço e novidades.
- 🛒 **Carrinho & Checkout:** Gerenciamento dinâmico de itens, cálculo de frete e cupom de desconto.
- 💳 **Pagamento via Webhook:** Integração com gateway de pagamento para confirmações automáticas de pedidos (Pix e Cartão).
- 👤 **Área do Cliente:** Cadastro/Login, histórico de pedidos e rastreamento de compras.
- ⚙️ **Painel Administrativo:** Gestão de estoque, inclusão de novos produtos e monitoramento de vendas.

---

## 🛠️ Tecnologias Utilizadas

### **Front-End**
- **Next.js / React** — Renderização rápida e SEO otimizado para e-commerce.
- **TypeScript** — Tipagem estática para maior segurança no código.
- **Tailwind CSS** — Estilização moderna e utilitária.
- **Vercel** — Hospedagem e deploy contínuo (CI/CD).

### **Back-End & Banco de Dados**
- **PHP / Node.js** — Regras de negócio, manipulação de pedidos e Webhooks.
- **MySQL / PostgreSQL** — Modelagem e persistência de dados.
- **APIs RESTful (JSON)** — Comunicação eficiente entre front-end e back-end.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **Git**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/goop-store.git
   cd goop-store
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com as seguintes chaves:
   ```env
   NEXT_PUBLIC_API_URL=https://sitegoop01.vercel.app/api
   NEXT_PUBLIC_PAYMENT_KEY=sua_chave_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 👤 Autor

Desenvolvido por **Nicolas Costa**  
- 💼 [LinkedIn](https://www.linkedin.com/in/nicolas-costa-7080832b0/)  
- 📧 [nicolasdeveng@gmail.com](mailto:nicolasdeveng@gmail.com)  
- 💻 [GitHub](https://github.com/)
