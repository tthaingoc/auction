import { useEffect } from 'react';
import ProductList from './ProductList';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import useProducts from '../../app/hooks/useProducts';

export default function Catalog() {
    const {products} = useProducts();  
    useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded} = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    return (
        <>
            <ProductList products={products} />
        </>
    )
    
}