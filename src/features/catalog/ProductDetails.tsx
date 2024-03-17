import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/error/NotFound";
import LoadingCom from "../../app/layout/LoadingCom";

export default function ProductDetails() {
  const {id} = useParams<{id: string}>();
  const [product, setProducts] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
      .then(response => setProducts(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [id])

  if(loading) return <LoadingCom message='Loading Real Estate ...' />
  if(!product) return <NotFound/>

  return (
    <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.code} alt={product.name} style={{ width: '100%' }} />
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
