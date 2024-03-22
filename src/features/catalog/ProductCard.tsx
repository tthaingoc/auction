import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Order.addItem(productId)
           // .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                        {product.code.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title= {"Bất Động Sản :" + product.code}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            {product.realEstateImages && product.realEstateImages.length > 0 && (
    <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        image={product.realEstateImages[0].imageURL}
        title={product.code}
    />
)}
            <CardContent>
                <Typography gutterBottom color='info.main' variant="h6" component="div">
                        {product.name}   
                </Typography>
                <Typography variant="body1" color="text.primary">
                   Giá khởi điểm : {product.startPrice} triệu VNĐ                                
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   Địa chỉ : {product.address} {product.province}               
                </Typography>             
                <Typography variant="body2" color="text.secondary">
                Ngày khởi tạo : {new Date(product.dateSubmited).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </Typography>               
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/auction`} size="small">Xem đấu giá</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">Xem chi tiết</Button>
                <LoadingButton
                    loading={loading}
                    onClick={() => handleAddItem(product.id)}
                    size="small">+</LoadingButton>
            </CardActions>
        </Card>
    )
}