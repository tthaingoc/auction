import { Typography, Grid, Paper, Box, Button, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { useEffect } from "react";
import {yupResolver} from '@hookform/resolvers/yup';
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { Auction } from "../../app/models/auction";
import { setAuction } from "../auction/auctionSlice";
import { validationAuctionSchema } from "./auctionValidation";



interface Props {
    auction?: Auction;
    cancelEdit: () => void;
}

export default function ProductForm({auction, cancelEdit}: Props) {
    const {control, reset, handleSubmit, formState: {isDirty, isSubmitting}} = useForm({
        resolver: yupResolver<any>(validationAuctionSchema)
    });
    
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (auction && !isDirty) reset(auction);
    }, [auction, reset, isDirty])

    async function handleSubmitData(data: FieldValues) {
        try {
            let response : Auction;
            if(auction) {
                response = await agent.Admin.updateAuction(auction.id, data);
            } else {
                response = await agent.Admin.createAuction(data);
            }
            dispatch(setAuction(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Auction's Detail
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='title' label='title' />
                </Grid>
                <Grid item xs={12} sm={6}>
                        <AppTextInput
                            control={control}
                            name="date"
                            label="Date"
                            defaultValue={auction ? new Date(auction.date).toISOString() : ''}
                            type="date"
                        />
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