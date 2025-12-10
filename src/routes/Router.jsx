import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUP from "../Authentication/SignUp/SignUP";
import Books from "../pages/Home/Books/Books";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBook from "../pages/Dashboard/LibrarianPages/AddBook/AddBook";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import BookDetails from "../pages/Home/BookDetails/BookDetails";
import MyOrders from "../pages/Dashboard/UserPages/MyOrders/MyOrders";
import MyWishlist from "../pages/Dashboard/UserPages/MyWishlist/MyWishlist";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AdminPages/AllUsers/AllUsers";
import OwnerOrder from "../pages/Dashboard/LibrarianPages/OwnerOrder/OwnerOrder";
import MyBooks from "../pages/Dashboard/LibrarianPages/MyBooks/MyBooks";
import EditBook from "../pages/Dashboard/LibrarianPages/EditBook/EditBook";
import ManageBooks from "../pages/Dashboard/AdminPages/ManageBooks/ManageBooks";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import MyInvoice from "../pages/Dashboard/UserPages/MyInvoice/MyInvoice";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AboutPage from "../pages/Home/AboutPage/AboutPage";
import LibrarianRoute from "./LibrarianRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/books",
        element: <Books></Books>,
      },
      {
        path: "/about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUP></SignUP>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "my-wishlist",
        element: (
          <PrivateRoute>
            <MyWishlist></MyWishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "my-invoice",
        element: (
          <PrivateRoute>
            <MyInvoice></MyInvoice>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <PrivateRoute>
              <AddBook></AddBook>
            </PrivateRoute>
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <PrivateRoute>
              <EditBook></EditBook>
            </PrivateRoute>
          </LibrarianRoute>
        ),
      },
      {
        path: "orders-collection",
        element: (
          <PrivateRoute>
            <OwnerOrder></OwnerOrder>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AllUsers></AllUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <PrivateRoute>
            <ManageBooks></ManageBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <PrivateRoute>
            <PaymentCancel></PaymentCancel>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
