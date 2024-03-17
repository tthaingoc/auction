import { useState, useEffect } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';
import LoadingCom from '../../app/layout/LoadingCom';

export default function Catalog() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
     agent.Catalog.list().then(products => setProducts(products))
                            .catch(error => console.log(error))
                                .finally(() => setLoading(false));
    }, [])
    if (loading) return <LoadingCom message='Loading Real Estate...' />

    return (
        <>
            <ProductList products={products} />
        </>
    )
    
}