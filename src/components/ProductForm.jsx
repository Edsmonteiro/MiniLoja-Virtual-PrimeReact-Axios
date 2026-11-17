
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { categorias } from '../utils/products';

export default function ProductForm({onSalvar,onCancelar,salvando}){
  const[titulo,setTitulo]=useState('');
  const[preco,setPreco]=useState(null);
  const[categoria,setCategoria]=useState(null);
  const[descricao,setDescricao]=useState('');
  const[imagem,setImagem]=useState('');
  const[erro,setErro]=useState('');
  async function enviar(event){
    event.preventDefault();
    if(!titulo.trim()||!descricao.trim()||!categoria||!Number.isFinite(preco)||preco<=0){setErro('Preencha nome, categoria, preço maior que zero e descrição.');return;}
    if(imagem.trim()&&!/^https?:\/\//i.test(imagem.trim())){setErro('Informe uma URL iniciada em http:// ou https://.');return;}
    setErro('');
    await onSalvar({title:titulo.trim(),price:preco,category:categoria,description:descricao.trim(),image:imagem.trim()});
  }
  return <form className="product-form" onSubmit={enviar} noValidate>
    <div className="field"><label htmlFor="produto-titulo">Nome do produto *</label><InputText id="produto-titulo" value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Ex.: Fone de ouvido sem fio" maxLength={100}/></div>
    <div className="two-fields"><div className="field"><label htmlFor="produto-categoria">Categoria *</label><Dropdown inputId="produto-categoria" value={categoria} options={categorias} onChange={e=>setCategoria(e.value)} placeholder="Selecione"/></div><div className="field"><label htmlFor="produto-preco">Preço (USD) *</label><InputNumber inputId="produto-preco" value={preco} onValueChange={e=>setPreco(e.value)} mode="currency" currency="USD" locale="pt-BR" min={0}/></div></div>
    <div className="field"><label htmlFor="produto-descricao">Descrição *</label><textarea id="produto-descricao" value={descricao} onChange={e=>setDescricao(e.target.value)} placeholder="Descreva o produto" rows={4} maxLength={400}/></div>
    <div className="field"><label htmlFor="produto-imagem">URL da imagem (opcional)</label><InputText id="produto-imagem" type="url" value={imagem} onChange={e=>setImagem(e.target.value)} placeholder="https://exemplo.com/imagem.jpg"/><small className="help">Sem imagem? Será usado um ícone ilustrativo.</small></div>
    {erro&&<p role="alert" className="form-error">{erro}</p>}
    <div className="form-actions"><Button type="button" label="Cancelar" text severity="secondary" disabled={salvando} onClick={onCancelar}/><Button type="submit" label={salvando?'Salvando...':'Adicionar produto'} icon="pi pi-plus" loading={salvando}/></div>
  </form>;
}
