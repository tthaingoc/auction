import * as yup from 'yup'

export const validationSchema = yup.object({
    code: yup.string().required('Estates code is required'),
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    startPrice: yup.number().required('Start Price is required').positive('Start Price must be positive'),
    acreage: yup.number().required('Acreage is required').positive('Acreage must be positive'),
    address: yup.string().required('Address is required'),
    province: yup.string().required('Province is required'),
    description: yup.string().required('Description is required'),
    image: yup.mixed().required()

});
