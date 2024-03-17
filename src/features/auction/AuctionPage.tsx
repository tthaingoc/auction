// import { Remove, Add, Delete } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import agent from "../../app/api/agent";


// export default function AuctionPage() {
//     const { auction, setAuction, removeItem } = useStoreContext();
//     const [status, setStatus] = useState({
//         loading: false,
//         name: ''
//     });

//     function handleAddItem(productId: number, name: string) {
//         setStatus({ loading: true, name });
//         agent.Basket.addItem(productId)
//             .then(basket => setBasket(basket))
//             .catch(error => console.log(error))
//             .finally(() => setStatus({ loading: false, name: '' }))
//     }

//     function handleRemoveItem(productId: number, quantity = 1, name: string) {
//         setStatus({ loading: true, name });
//         agent.Basket.removeItem(productId, quantity)
//             .then(() => removeItem(productId, quantity))
//             .catch(error => console.log(error))
//             .finally(() => setStatus({ loading: false, name: '' }))
//     }

//     if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

//     return (
//         <>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Real Estate</TableCell>
//                             <TableCell align="right">Price</TableCell>
//                             <TableCell align="center">Start Price</TableCell>
//                             <TableCell align="right"></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {basket.items.map((item) => (
//                             <TableRow
//                                 key={item.productId}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     <Box display='flex' alignItems='center'>
//                                         <img style={{ height: 50, marginRight: 20 }} src={item.pictureUrl} alt={item.name} />
//                                         <span>{item.name}</span>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
//                                 <TableCell align="center">
//                                     <LoadingButton
//                                         color='error'
//                                         loading={status.loading && status.name === 'rem' + item.productId}
//                                         onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}
//                                     >
//                                         <Remove />
//                                     </LoadingButton>
//                                     {item.quantity}
//                                     <LoadingButton
//                                         loading={status.loading && status.name === 'add' + item.productId}
//                                         onClick={() => handleAddItem(item.productId, 'add' + item.productId)}
//                                         color='secondary'
//                                     >
//                                         <Add />
//                                     </LoadingButton>
//                                 </TableCell>
//                                 <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
//                                 <TableCell align="right">
//                                     <LoadingButton
//                                         loading={status.loading && status.name === 'del' + item.productId}
//                                         onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
//                                         color='error'
//                                     >
//                                         <Delete />
//                                     </LoadingButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Grid container>
//                 <Grid item xs={6}></Grid>
//                 <Grid item xs={6}>
//                     {/* <BasketSummary /> */}
//                     <Button
//                         component={Link}
//                         to={'/checkout'}
//                         variant='contained'
//                         size='large'
//                         fullWidth>
//                         Checkout
//                     </Button>
//                 </Grid>
//             </Grid>
//         </>

//     )
// }

// function useStoreContext(): { basket: any; setBasket: any; removeItem: any; } {
//     throw new Error("Function not implemented.");
// }


// function useState(arg0: { loading: boolean; name: string; }): [any, any] {
//     throw new Error("Function not implemented.");
// }
