import { Grid, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <><Typography variant="h6" gutterBottom className='content-element'>
            Các loại tài sản
        </Typography>
        
        <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={3} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid></>
    )
}