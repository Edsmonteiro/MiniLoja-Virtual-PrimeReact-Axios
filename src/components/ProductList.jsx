
import { Skeleton } from 'primereact/skeleton';
import ProductCard from './ProductCard';
export default function ProductList({produtos,carregando,onAdicionar}){
  if(carregando && produtos.length===0)return <div className="grid product-grid" aria-label="Carregando catálogo">{Array.from({length:8},(_,i)=><div key={i} className="col-12 sm:col-6 lg:col-4 xl:col-3"><div className="skeleton-card"><Skeleton height="205px" borderRadius="12px"/><Skeleton width="45%" height="15px" className="mt-3"/><Skeleton width="95%" height="20px" className="mt-3"/><Skeleton width="100%" height="40px" className="mt-4"/></div></div>)}</div>;
  if(produtos.length===0)return <div className="empty-state"><i className="pi pi-search"/><h3>Nenhum produto encontrado</h3><p>Tente outra busca ou ajuste os filtros.</p></div>;
  return <div className="grid product-grid">{produtos.map(produto=><div className="col-12 sm:col-6 lg:col-4 xl:col-3" key={(produto.local?'local':'api')+'-'+produto.id}><ProductCard produto={produto} onAdicionar={onAdicionar}/></div>)}</div>;
}
