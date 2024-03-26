import * as yup from 'yup'

export const validationAuctionSchema = yup.object({
    title: yup.string().required('Auction title is required'),
    date: yup.mixed()
});
