
import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { moeda, traducaoCategoria } from '../utils/products';

export default function ProductCard({produto,onAdicionar}){
  const [imagemFalhou,setImagemFalhou]=useState(false);
  const imagem=produto.image && /^https?:\/\//i.test(produto.image) && !imagemFalhou;
  const header=<div className="product-media">{imagem?<img src={produto.image} alt={produto.title} loading="lazy" onError={()=>setImagemFalhou(true)}/>:<div className="product-placeholder"><i className="pi pi-image"/></div>}{produto.local&&<span className="local-badge">Adicionado por você</span>}</div>;
  return <Card header={header} className="product-card h-full"><div className="product-card-content">
    <div className="product-topline"><Tag value={traducaoCategoria[produto.category]||produto.category||'Outros'} severity="info"/><span className="product-id">#{String(produto.id).slice(-5)}</span></div>
    <h3 title={produto.title}>{produto.title}</h3><p className="product-desc">{produto.description||'Sem descrição disponível.'}</p>
    <div className="product-card-footer"><div><small>Preço</small><b>{moeda(produto.price)}</b></div><Button type="button" label="Adicionar" icon="pi pi-plus" size="small" onClick={()=>onAdicionar(produto)} aria-label={'Adicionar '+produto.title+' à sacola'}/></div>
  </div></Card>;
}
