import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import AddProducts from "../pages/AddProduct";
import ProductCategory from "../pages/ProductCategory";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import DashboardPage from "../pages/DashboardPage";
import EditProduct from "../pages/EditProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/books",
                element: <ProductCategory />,
            },
            {
                path: "/books/:id",
                element: <ProductDetailsPage />
            },
            {
                path: "/add",
                element: <AddProducts />
            },
            {
                path: "/edit/:id",
                element: <EditProduct />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardPage />
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;