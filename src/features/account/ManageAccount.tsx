import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import { Account } from '../../app/models/user';
import React, { useState, useEffect } from 'react';
import { Account } from '../../app/models/user';

export default function ManageAccount() {
  const [listAccounts, setListAccounts] = useState<any>(null);
  const user = localStorage.getItem('user');
  //API
  useEffect(()=>{
    const fetchUser = async () => {
      try {        
        if (user) {
            const userInfo: Account = JSON.parse(user);        
            // Lấy userId từ userName hoặc từ một trường khác trong đối tượng
            const userId: string = userInfo.id;
              // Fetch dữ liệu từ API accounts
              const listAccountResponse = await fetch('https://localhost:5001/api/Account/GetAllAccounts');
              if (!listAccountResponse.ok) {
                  throw new Error('Failed to fetch account data');
              }
              const listAccountData: Account = await listAccountResponse.json();
              console.log(listAccountData);
              setListAccounts(listAccountData); 
            } else {
                console.log('Không tìm thấy thông tin người dùng trong localStorage');
            }  
      } catch (error) {
          console.error('Đã có lỗi xảy ra:', error);
      }
  };

  fetchUser();
  },[])

  console.log(listAccounts);

  return (
    <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Account</Typography>
                {/* <Button
                    sx={{ m: 2 }}
                    size='large' variant='contained'
                    onClick={() => setEditMode(true)}
                >
                    Create
                </Button> */}
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Account</TableCell> */}
                            <TableCell align="left">Full Name</TableCell>                          
                            <TableCell align="left">User Name</TableCell>
                            <TableCell align="center"> Phone</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {listAccounts.map((product) => ( */}
                          {listAccounts && listAccounts.map((account : any, index :  any) => {
                            return(
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell component="th" scope="row">
                                    {account.fullName}
                                </TableCell>                  */}
                                <TableCell align="left">{account.fullName}</TableCell>             
                                <TableCell align="left">{account.userName}</TableCell>
                                <TableCell align="center">{account.phone}</TableCell>
                                <TableCell align="center">{account.email}</TableCell>
                                {/* <TableCell align="right">
                                    <Button
                                        startIcon={<Edit />}
                                        onClick={() => handleSelectProduct(product)}
                                    />
                                    <LoadingButton
                                        loading={loading && target === product.id}
                                        startIcon={<Delete />} color='error'
                                        onClick={() => handleDeleteProduct(product.id)}
                                    /> 
                                </TableCell> */}
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {metaData &&
                <Box sx={{ pt: 2 }}>
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />
                </Box>
            } */}
        
            {/* <Box display='flex' justifyContent='space-between'>
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
            </TableContainer> */}
        </>
  )
}
