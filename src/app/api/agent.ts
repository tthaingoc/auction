import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

axios.defaults.baseURL = 'https://localhost:5001/api/';
axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
})

//using ..  error handling
axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title || 'Unauthorized');
            break;
        case 403:
            toast.error('Your role is not allowed to use this feature');
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string,body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item: any) {
    const formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key]);
    }
    return formData;
}

const Admin = {
    createProduct: (product: any) => requests.postForm('RealEstate', createFormData(product)),
    updateProduct: (id: number, product: any) => requests.putForm(`RealEstate/${id}`, createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`RealEstate/${id}`),
    deleteAuction: (id: number) => requests.delete(`Auction/${id}`),
    updateAuction: (id: number, auction: any) => requests.putForm(`Auction/${id}`, createFormData(auction)),
    createAuction: (auction: any) => requests.postForm('Auction/auction', createFormData(auction)),
}
const Catalog = {
    list: () => requests.get('RealEstate'),
    getValidationError: () => requests.get('RealEstate'),
    details: (id: number) => requests.get(`RealEstate/${id}`)
}
const Auction = {
    list: () => requests.get('Auction/no-paging'),
    todayAuction: (id: number) => requests.get(`Auction/TodayAuction/${id}`),
    upList: () => requests.get('Auction/UpcomingAuction'),
    getValidationError: () => requests.get('Auction/UpcomingAuction'),
    getValidationErrorA: () => requests.get('Auction/TodayAuction'),
    details: (id: number) => requests.get(`Auction/${id}`)
}

const Order = {
    get: () => requests.get('orders'),
    addItem: (productId: number) => requests.post(`orders?id=${productId}`, {}),
    removeItem: (productId: number) => requests.delete(`orders?id=${productId}`)
}
const Account = {
    login: (values: any) => requests.post('Account/Login', values),
    register: (values: any) => requests.post('Account/Register', values),
    currentUser: () => requests.get('Account/GetAccountById/profile')
}


const agent ={
    Catalog,
    Auction,
    Order,
    Account,
    Admin
}

export default agent;