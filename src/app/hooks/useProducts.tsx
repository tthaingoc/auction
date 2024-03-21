import { useEffect } from "react";
import { productSelectors, fetchProductsAsync } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded} = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    return {
        products,
        productsLoaded
    }
}