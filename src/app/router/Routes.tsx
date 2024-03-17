import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import NewsPage from "../../features/news/NewsPage";
import AuctionList from "../../features/auction/AutionList";
import NotFound from "../error/NotFound";
import Login from "../../features/account/Login";
//import Register from "../../features/account/Register";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'auction', element: <AuctionList />},
            {path: 'news', element: <NewsPage />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />}, 
            {path: 'login', element: <Login />}, 
           // {path: 'register', element: <Register />}, 
            {path: 'not-found', element: <NotFound />},           
            {path: '*', element: <Navigate replace to='/not-found' />},           
        ]
    }
])