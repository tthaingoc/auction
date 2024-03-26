import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "../../app/error/NotFound";
import LoadingCom from "../../app/layout/LoadingCom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { auctionSelector, fetchAuctionAsync } from "./auctionSlice";


export default function AuctionPage() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const auction = useAppSelector(state => auctionSelector.selectById(state, parseInt(id!)));
    const { status: auctionStatus } = useAppSelector(state => state.auction);

    useEffect(() => {
        if (!auction) dispatch(fetchAuctionAsync(parseInt(id!)));
    }, [id, dispatch, auction])

    if (auctionStatus.includes('pending')) return <LoadingCom message="Loading Real Estates..." />
    if (!auction) return <NotFound />

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Đấu giá tài sản</TableCell>
                            <TableCell align="right">Giá niêm yết</TableCell>
                            <TableCell align="center">Giá hiện tại</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auction.realEstates && auction.realEstates.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        {item.realEstateImages && item.realEstateImages.length > 0 && // Null check for realEstateImages
                                            <img style={{ height: 50, marginRight: 20 }} src={item.realEstateImages[0].imageURL} alt={item.name} />
                                        }
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">$ {item.price}.000.000 vnđ</TableCell>
                                <TableCell align="right">$ {item.startPrice}.000.000 vnđ</TableCell>
                                <TableCell align="right">
                                    <Button
                                        component={Link}
                                        to={`/catalog/${item.id}`}
                                        variant='contained'
                                        size='small'
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Button
                        component={Link}
                        to={'/checkout'}
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Nâng giá
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}