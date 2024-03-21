import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Product } from "../../app/models/product";
import { useEffect } from "react";
import AppDropzone from "../../app/components/AppDropzone";
import {yupResolver} from '@hookform/resolvers/yup';
import { validationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";



interface Props {
    product?: Product;
    cancelEdit: () => void;
}

export default function ProductForm({product, cancelEdit}: Props) {
    const {control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting}} = useForm({
        resolver: yupResolver<any>(validationSchema)
    });
    
    const watchFile = watch('file', null)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (product && !watchFile && !isDirty) reset(product);
        return () => {
            if(watchFile) URL.revokeObjectURL(watchFile.preview)
        }
    }, [product, reset, watchFile, isDirty])

    async function handleSubmitData(data: FieldValues) {
        try {
            let response : Product;
            if(product) {
                response = await agent.Admin.updateProduct(product.id, data);
            } else {
                response = await agent.Admin.createProduct(data);
            }
            dispatch(setProduct(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Real Estates' Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='code' label='code' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='name' label='name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='price' label='Price' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='startPrice' label='Start Price' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='acreage' label='Acreage' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='address' label='Address' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='province' label='Province' />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='description' label='Description' />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='auctionId' label='AuctionId' />
                </Grid>
                 <Grid item xs={12} sm={6}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <AppDropzone control={control} name='file'/>
                    {watchFile? (
                        <img src={watchFile.preview} alt="preview" style={{maxHeight: 200}}/>
                    ):(
                        <img src={product?.name} alt={product?.name} style={{maxHeight: 200}}/>
                    )}
                    </Box>             
                </Grid>  
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
            </Box>
            </form>
        </Box>
    )
}
