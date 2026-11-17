
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { obterProdutos, enviarProduto } from './services/api';
import { categorias, lerProdutosLocais, STORAGE_KEY } from './utils/products';

const ordenacoes=[{label:'Mais relevantes',value:'default'},{label:'Menor preço',value:'asc'},{label:'Maior preço',value:'desc'},{label:'Nome (A–Z)',value:'az'}];

export default function App(){
  const [produtosAPI,setProdutosAPI]=useState([]);
  const [produtosLocais,setProdutosLocais]=useState(lerProdutosLocais);
  const [carregando,setCarregando]=useState(true);
  const [erroAPI,setErroAPI]=useState('');
  const [busca,setBusca]=useState('');
  const [categoria,setCategoria]=useState(null);
  const [ordenacao,setOrdenacao]=useState('default');
  const [formAberto,setFormAberto]=useState(false);
  const [salvando,setSalvando]=useState(false);
  const [aviso,setAviso]=useState('');
  const [carrinho,setCarrinho]=useState(0);
  const [tentativa,setTentativa]=useState(0);

  useEffect(()=>{
    const controlador=new AbortController();
    setCarregando(true);
    setErroAPI('');
    obterProdutos(controlador.signal)
      .then(resposta=>{if(!Array.isArray(resposta.data))throw new Error('Formato inesperado');setProdutosAPI(resposta.data);})
      .catch(erro=>{if(erro.code!=='ERR_CANCELED'&&!controlador.signal.aborted)setErroAPI('Não foi possível acessar a Fake Store API. Verifique a conexão e tente novamente.');})
      .finally(()=>{if(!controlador.signal.aborted)setCarregando(false);});
    return ()=>controlador.abort();
  },[tentativa]);

  useEffect(()=>{try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(produtosLocais));}catch{}},[produtosLocais]);

  const produtosFiltrados=useMemo(()=>{
    const texto=busca.toLocaleLowerCase('pt-BR').trim();
    return [...produtosLocais,...produtosAPI].filter(item=>{
      const combinaBusca=!texto||(item.title+' '+(item.description||'')).toLocaleLowerCase('pt-BR').includes(texto);
      return combinaBusca&&(!categoria||item.category===categoria);
    }).sort((a,b)=>{
      if(ordenacao==='asc')return Number(a.price)-Number(b.price);
      if(ordenacao==='desc')return Number(b.price)-Number(a.price);
      if(ordenacao==='az')return a.title.localeCompare(b.title,'pt-BR');
      return 0;
    });
  },[produtosAPI,produtosLocais,busca,categoria,ordenacao]);

  async function criarProduto(dados){
    setSalvando(true);setAviso('');let retornoAPI=false;
    try{await enviarProduto(dados);retornoAPI=true;}catch{}
    const novo={...dados,id:'novo-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),local:true};
    setProdutosLocais(anteriores=>[novo,...anteriores]);
    setFormAberto(false);setSalvando(false);
    setAviso(retornoAPI?'A API confirmou o POST de demonstração. O produto foi salvo neste navegador.':'API indisponível: o produto foi salvo apenas neste navegador.');
  }
  function adicionarSacola(produto){setCarrinho(valor=>valor+1);setAviso(produto.title+' adicionado à sacola demonstrativa.');}

  return <>
    <header className="store-header"><div className="container header-inner">
      <a href="#inicio" className="store-brand"><span className="store-logo"><i className="pi pi-shopping-bag"/></span><span>vitrine<b>.</b></span></a>
      <nav className="store-nav"><a href="#catalogo">Produtos</a><a href="#sobre">Como funciona</a></nav>
      <div className="header-right"><span className="header-caption">A sua próxima descoberta está aqui.</span><span className="cart-chip" aria-live="polite"><i className="pi pi-shopping-cart"/> {carrinho} na sacola</span></div>
    </div></header>
    <main id="inicio">
      <section className="container top-section"><div className="store-hero"><div className="store-hero-copy"><div className="hero-label">NOVAS DESCOBERTAS TODOS OS DIAS</div><h1>Seu próximo favorito<br/>está <em>por aqui.</em></h1><p>Explore um catálogo completo e descubra como uma loja ganha vida com React e requisições HTTP.</p><a href="#catalogo" className="hero-cta">Explorar produtos <i className="pi pi-arrow-right"/></a></div><div className="hero-visual" aria-hidden="true"><div className="product-cube"><i className="pi pi-shopping-bag"/></div><div className="decor-circle one"/><div className="decor-circle two"/><div className="floating-price"><i className="pi pi-star-fill"/> Novidades todos os dias</div></div></div></section>
      <section className="container catalog-section" id="catalogo">
        <div className="catalog-heading"><div><div className="eyebrow">NOSSO CATÁLOGO</div><h2>Encontre algo especial<span>.</span></h2><p>Produtos carregados pela Fake Store API e suas próprias criações.</p></div><Button label="Novo produto" icon="pi pi-plus" className="new-product-button" onClick={()=>setFormAberto(true)}/></div>
        <div className="filter-panel"><span className="search-field"><i className="pi pi-search"/><InputText value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar no catálogo..." aria-label="Buscar produtos"/></span><Dropdown className="category-filter" value={categoria} options={[{label:'Todas as categorias',value:null},...categorias]} onChange={e=>setCategoria(e.value)}/><Dropdown className="sort-filter" value={ordenacao} options={ordenacoes} onChange={e=>setOrdenacao(e.value)}/></div>
        <div className="list-toolbar"><span>{carregando?'Carregando produtos...':produtosFiltrados.length+' produtos encontrados'}</span><span className="api-marker"><i className="pi pi-circle-fill"/> {erroAPI?'API indisponível':'Fake Store API + seus produtos'}</span></div>
        {erroAPI&&<div className="api-error" role="alert"><Message severity="warn" text={erroAPI}/><Button text label="Tentar novamente" icon="pi pi-refresh" onClick={()=>setTentativa(valor=>valor+1)}/></div>}
        {aviso&&<div className="notice" role="status"><i className="pi pi-check-circle"/><span>{aviso}</span><button type="button" onClick={()=>setAviso('')} aria-label="Dispensar aviso"><i className="pi pi-times"/></button></div>}
        <ProductList produtos={produtosFiltrados} carregando={carregando} onAdicionar={adicionarSacola}/>
      </section>
      <section className="container about-section" id="sobre"><div className="about-strip"><span className="about-strip-icon"><i className="pi pi-code"/></span><div><h3>Uma loja feita para aprender.</h3><p>React, Axios, PrimeReact, PrimeFlex, requisições GET/POST e preços em dólares (USD).</p></div><span className="activity-mark">ATIVIDADE 06</span></div></section>
    </main>
    <footer className="footer"><div className="container"><span>© 2026 Vitrine. — Projeto demonstrativo.</span><span>Feito com React + Fake Store API.</span></div></footer>
    <Dialog header="Adicionar novo produto" visible={formAberto} onHide={()=>{if(!salvando)setFormAberto(false)}} style={{width:'min(560px,95vw)'}} closable={!salvando}>
      <p className="dialog-description">Crie um item para a vitrine. A API simula o cadastro, e os itens são mantidos neste navegador.</p>
      <ProductForm onSalvar={criarProduto} onCancelar={()=>setFormAberto(false)} salvando={salvando}/>
    </Dialog>
  </>;
}
