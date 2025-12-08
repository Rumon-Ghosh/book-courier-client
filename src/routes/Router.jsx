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
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import OwnerOrder from "../pages/Dashboard/OwnerOrder/OwnerOrder";
import MyBooks from "../pages/Dashboard/MyBooks/MyBooks";

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
        element: <PrivateRoute>
          <BookDetails></BookDetails>
        </PrivateRoute>
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
        element: <PrivateRoute>
          <MyOrders></MyOrders>
        </PrivateRoute>
      },
      {
        path: 'my-wishlist',
        element: <PrivateRoute>
          <MyWishlist></MyWishlist>
        </PrivateRoute>
      },
      {
        path: 'my-profile',
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>
      },
      {
        path: 'add-book',
        element: <PrivateRoute>
          <AddBook></AddBook>
        </PrivateRoute>
      },
      {
        path: 'my-books',
        element: <PrivateRoute>
          <MyBooks></MyBooks>
        </PrivateRoute>
      },
      {
        path: 'orders-collection',
        element: <PrivateRoute>
          <OwnerOrder></OwnerOrder>
        </PrivateRoute>
      },
      {
        path: 'all-users',
        element: <PrivateRoute>
          <AllUsers></AllUsers>
        </PrivateRoute>
      }
    ]
  }
])