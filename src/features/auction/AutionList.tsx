import { useEffect, useState } from 'react'
import { Auction } from '../../app/models/auction';
import { Typography, Grid, Alert, AlertTitle, List, ListItem, ListItemText } from '@mui/material';
import AuctionCard from './AuctionCard';
import agent from '../../app/api/agent';


export default function AuctionList() {
    const [upcomingAuction, setUpcomingAuction] = useState<Auction[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);


    useEffect(() => {       
        agent.Auction.list().then(auctions => setUpcomingAuction(auctions)).catch(error => setValidationErrors(error));
    }, []);

    return (
        <>                         
            <Typography variant="h6" gutterBottom className='content-element' style={{ marginBottom: '50px' }}>
                Các cuộc đấu giá đang diễn ra
            </Typography>
            <Grid container spacing={4}>
                {upcomingAuction.map(auction => (
                    <Grid item xs={3} key={auction.id}>
                        <AuctionCard auctionOn={auction} />
                    </Grid>
                ))}
            </Grid>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>}
        </>
    );
}
