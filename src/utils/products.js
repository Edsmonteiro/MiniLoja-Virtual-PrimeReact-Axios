
export const STORAGE_KEY='vitrine-produtos-criados-v1';
export const categorias=[
 {label:'Eletrônicos',value:'electronics'},
 {label:'Joias',value:'jewelery'},
 {label:'Roupas masculinas',value:"men's clothing"},
 {label:'Roupas femininas',value:"women's clothing"}
];
export const traducaoCategoria={
 electronics:'Eletrônicos',jewelery:'Joias',"men's clothing":'Moda masculina',"women's clothing":'Moda feminina'
};
export function moeda(valor){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'USD'}).format(Number(valor)||0);}
export function lerProdutosLocais(){try{const dados=JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(dados)?dados.filter(item=>item&&typeof item.title==='string'&&Number(item.price)>0):[];}catch{return [];}}
