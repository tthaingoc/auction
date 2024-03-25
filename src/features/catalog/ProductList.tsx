import { Grid, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardA from "./ProductCardA";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog)
    return (
        <><Typography variant="h6" gutterBottom className='content-element'>
            Các loại tài sản
        </Typography>
        
        <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={3} key={product.id}>
                        {!productsLoaded ? (
                                <ProductCardA/>
                        ): (
                        <ProductCard product={product} />
                     )}
                    </Grid>
                ))}
            </Grid></>
    )
}