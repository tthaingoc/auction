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
                image="https://media.istockphoto.com/id/1328041557/vi/anh/nh%C3%A0-tr%E1%BA%AFng-v%E1%BB%9Bi-nh%E1%BB%AFng-%C4%91%E1%BB%91ng-%C4%91%E1%BB%93ng-xu-v%C3%A0ng-v%C3%A0-chol-tr%C3%AAn-n%E1%BB%81n-b%C3%AA-t%C3%B4ng-v%C3%A0-g%E1%BB%97-kh%C3%A1i-ni%E1%BB%87m-ly-h%C3%B4n-v%C3%A0-ph%C3%A2n.jpg?s=1024x1024&w=is&k=20&c=9xFYBGaZrzR03XSnD0tVGb-39E-clLXYTIkj9DKKkpw="
                title={auctionOn.title}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h6" component="div">
                 {new Date(auctionOn.date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </Typography>
                <Typography gutterBottom color='text.secondary' variant="body1">
                 Trạng thái: {auctionOn.auctionStatus === 1 ? 'đã kết thúc' : auctionOn.auctionStatus === 2 ? 'sắp diễn ra' : 'đang diễn ra'}
                </Typography>                          
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/auction/${auctionOn.id}`} size="small">Vào đấu giá</Button>
            </CardActions>
        </Card>
    )
}