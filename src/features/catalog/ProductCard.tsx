import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={""}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h6" component="div">
                Ngày đấu giá :  {new Date(product.startTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   Địa chỉ : {product.address}                
                </Typography>
                <Typography variant="body2" color="text.primary">
                   Giá khởi điểm : {product.startPrice}.000.000 VNĐ                
                </Typography>               
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/auction`} size="small">Xem đấu giá</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">Xem chi tiết</Button>
            </CardActions>
        </Card>
    )
}