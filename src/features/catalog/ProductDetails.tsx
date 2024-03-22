import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NotFound from "../../app/error/NotFound";
import LoadingCom from "../../app/layout/LoadingCom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const {status: productStatus} = useAppSelector(state => state.catalog);
  
 // const [loading, setLoading] = useState(true)
//   useEffect(() => {
//     id && agent.Catalog.details(parseInt(id))
//       .then(response => setProducts(response))
//       .catch(error => console.log(error))
//       .finally(() => setLoading(false))
//   }, [id])

    useEffect(() => {
        if(!product) dispatch(fetchProductAsync(parseInt(id!)));
    },[id, dispatch, product])

//  if(loading) return <LoadingCom message='Loading Real Estate ...' />
if (productStatus.includes('pending')) return <LoadingCom message="Loading Real Estates..." />
  if(!product) return <NotFound/>

  return (
    <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.realEstateImages[0].imageURL} alt={product.name} style={{ width: '100%' }} />
                <Typography variant='h6' sx={{ mt: 4 }}>Hình ảnh khác:</Typography>
                <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {product.realEstateImages.slice(1).map((image, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" src={image.imageURL} alt={`Image ${index + 1}`} />
                            </ListItemAvatar>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>{(product.price).toFixed(3)}.000 vnđ</Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>{product.address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ngày bắt đầu đấu giá</TableCell>
                                <TableCell>{new Date(product.startTime).toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ngày kết thúc đấu giá</TableCell>
                                <TableCell>{new Date(product.endTime).toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Giá khởi điểm</TableCell>
                                <TableCell>{product.startPrice}.000.000 vnđ</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
  )
}
