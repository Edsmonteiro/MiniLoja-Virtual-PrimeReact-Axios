# Vitrine — Mini Loja Virtual com Fake Store API

Loja virtual responsiva criada com **React**, **PrimeReact**, **PrimeFlex** e **Axios** para praticar requisições HTTP, criação de componentes e manipulação de estados.

## Funcionalidades
- GET de produtos da [Fake Store API](https://fakestoreapi.com/products) com Axios;
- Produtos em cartões `Card` do PrimeReact usando `props`;
- Busca por nome, filtro de categoria e ordenação;
- Formulário de inclusão com `POST /products`;
- Salvamento local dos produtos criados por `localStorage` (o POST da API é apenas simulado);
- Indicador de sacola demonstrativa, tratamento de erro e layout responsivo em PrimeFlex.

## Rodar localmente

Requer Node.js e conexão à internet.

```bash
npm install
npm start
```

Acesse http://localhost:3000. Essa atividade utiliza **Create React App** (`react-scripts`), diferentemente das atividades 3 e 4 que usam Vite.

## Estrutura

- `src/App.js`: carregamento, estados, filtros e catálogo;
- `src/components/ProductList.jsx`: grid de itens;
- `src/components/ProductCard.jsx`: cartão PrimeReact com dados via props;
- `src/components/ProductForm.jsx`: formulário de novo produto;
- `src/services/api.js`: Axios e operações GET/POST;
- `src/utils/products.js`: categorias, moeda e armazenamento local;
- `src/App.css`: estilos personalizados e responsividade.

Os preços são exibidos em **USD**, sem conversão fictícia. A sacola é demonstrativa, sem pagamento. Capturas de tela estão disponíveis no pacote de entrega separado.
