import { Delete, Edit } from '@mui/icons-material';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useAppDispatch } from '../../app/store/configureStore';
import { useState } from 'react';
import { Product } from '../../app/models/product';
import ProductForm from './ProductForm';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import useAuctions from '../../app/hooks/useAuctions';
import { Auction } from '../../app/models/auction';
import { removeAuction } from '../auction/auctionSlice';
import AuctionForm from './AuctionForm';



export default function AuctionTable() {
    const { auctions } = useAuctions();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [selectedAuction, setSelectedAuction] = useState<Auction | undefined>(undefined);

    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);


    function handleSelectAuction(auction: Auction) {
        setSelectedAuction(auction);
        setEditMode(true);
    }

    function cancelEdit() {
        if (selectedProduct) setSelectedProduct(undefined);
        else if (selectedAuction) setSelectedAuction(undefined);
        setEditMode(false);
    }

    function handleDeleteAuction(id: number) {
        setLoading(true);
        setTarget(id)
        agent.Admin.deleteAuction(id)
            .then(() => dispatch(removeAuction(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }


    if (editMode) return <AuctionForm cancelEdit={cancelEdit} auction={selectedAuction} />

    return (

        <>

            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Auction Management</Typography>
                <Button
                    sx={{ m: 2 }}
                    size='large' variant='contained'
                    onClick={() => setEditMode(true)}
                >
                    Create
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Auctions</TableCell>
                            <TableCell align="left">Tiêu đề</TableCell>
                            <TableCell align="left">Ngày bắt đầu</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auctions.map((auction, index) => (
                            <TableRow
                                key={auction.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{auction.title}</TableCell>
                                <TableCell align="left">{new Date(auction.date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        startIcon={<Edit />}
                                        onClick={() => handleSelectAuction(auction)}
                                    />
                                    <LoadingButton
                                        loading={loading && target === auction.id}
                                        startIcon={<Delete />} color='error'
                                        onClick={() => handleDeleteAuction(auction.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}