import axios from 'axios';
export const api = axios.create({baseURL:'https://fakestoreapi.com',timeout:10000});
export const obterProdutos = (signal) => api.get('/products',{signal});
export const enviarProduto = (produto) => api.post('/products',produto);
