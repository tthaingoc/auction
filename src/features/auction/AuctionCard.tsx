import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Auction } from "../../app/models/auction";

interface Props {
    auctionOn: Auction;
}

export default function AuctionCard({ auctionOn }: Props) {
    return (
        <Card>
            <CardHeader
                title={auctionOn.title}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={auctionOn.title}
                title={auctionOn.title}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h6" component="div">
                 {new Date(auctionOn.date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </Typography>
                <Typography gutterBottom color='text.secondary' variant="body1">
                 Trạng thái: {auctionOn.auctionStatus === 1 ? 'đang diễn ra' : auctionOn.auctionStatus === 2 ? 'sắp diễn ra' : 'đã kết thúc'}
                </Typography>                          
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/auction/${auctionOn.id}`} size="small">Vào đấu giá</Button>
            </CardActions>
        </Card>
    )
}