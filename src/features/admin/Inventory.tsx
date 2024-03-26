import { Delete, Edit } from '@mui/icons-material';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useState } from 'react';
import { Product } from '../../app/models/product';
import ProductForm from './ProductForm';
import useProducts from '../../app/hooks/useProducts';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { removeProduct } from '../catalog/catalogSlice';

import { useAppDispatch } from '../../app/store/configureStore';
import { Link } from 'react-router-dom';

export default function Inventory() {
    
    const {products} = useProducts();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectProduct(product: Product) {
        setSelectedProduct(product);
        setEditMode(true);
    }
    function cancelEdit() {
        if (selectedProduct) {
        setSelectedProduct(undefined);
        }
        setEditMode(false);
    }


    function handleDeleteProduct(id: number) {
        setLoading(true);
        setTarget(id)
        agent.Admin.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }


    if (editMode) return <ProductForm cancelEdit={cancelEdit} product={selectedProduct} />

    return (
        <>
            <Box>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button
                    sx={{ m: 2 }}
                    size='large' variant='contained'
                    onClick={() => setEditMode(true)}
                >
                    Create
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Real Estate</TableCell>
                                <TableCell align="left">Name</TableCell>                          
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="center"> Price</TableCell>
                                <TableCell align="center">StartPrice</TableCell>
                                <TableCell align="center">Available</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.code}
                                    </TableCell>                              
                                    <TableCell align="left">{product.name}</TableCell>
                                    <TableCell align="left">{product.address}</TableCell>
                                    <TableCell align="center">{product.price}.000.000 vnđ</TableCell>
                                    <TableCell align="center">{product.startPrice}.000.000 vnđ</TableCell>
                                    <TableCell align="center">{product.realEstateStatus === 1 ? "Yes" : "No"}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            startIcon={<Edit />}
                                            onClick={() => handleSelectProduct(product)}
                                        />
                                        <LoadingButton
                                            loading={loading && target === product.id}
                                            startIcon={<Delete />} color='error'
                                            onClick={() => handleDeleteProduct(product.id)}
                                        /> 
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <Typography sx={{ p: 2 }} variant='h4'>Auction Management</Typography>
               
                <Button
                    component={Link} 
                    to="/auctiontable" 
                    sx={{ m: 2 }}
                    size='large' variant='contained'
                >
                    Go to Auction Page
                </Button>
                {/* Auction management table */}
                <TableContainer component={Paper}>
                    {/* Existing auction management table */}
                </TableContainer>
            </Box>
        

        </>
    )
}
