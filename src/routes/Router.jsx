import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUP from "../Authentication/SignUp/SignUP";
import Books from "../pages/Home/Books/Books";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBook from "../pages/Dashboard/AddBook/AddBook";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import BookDetails from "../pages/Home/BookDetails/BookDetails";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyWishlist from "../pages/Dashboard/MyWishlist/MyWishlist";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/books',
        element: <Books></Books>,
      },
      {
        path: '/book/:id',
        element: <BookDetails></BookDetails>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element: <SignUP></SignUP>
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path: 'my-orders',
        element: <MyOrders></MyOrders>
      },
      {
        path: 'my-wishlist',
        element: <MyWishlist></MyWishlist>
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'add-book',
        element: <AddBook></AddBook>
      }
    ]
  }
])