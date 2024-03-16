import { useEffect, useState } from 'react'
import { Auction } from '../../app/models/auction';
import { Typography, Grid, CssBaseline } from '@mui/material';
import AuctionCard from './AuctionCard';
import AuctionCardB from './AuctionCardB';


export default function AuctionList() {
    const [ongoingAuctions, setOngoingAuctions] = useState<Auction[]>([]);
    const [upcomingAuctions, setUpcomingAuctions] = useState<Auction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://localhost:5001/api/Auction/TodayAuction')
            .then(response => response.json())
            .then(data => {setLoading(false); setOngoingAuctions(data)});

        fetch('https://localhost:5001/api/Auction/UpcomingAuction')
            .then(response => response.json())
            .then(data => setUpcomingAuctions(data));
    }, []);

    return (
        <>                         
            <Typography variant="h6" gutterBottom className='content-element'>
                Các cuộc đấu giá đang diễn ra
            </Typography>
            <Grid container spacing={4}>
                {upcomingAuctions.map(auction => (
                    <Grid item xs={3} key={auction.id}>
                        <AuctionCard auctionOn={auction} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
