import Home from "../pages/Home/Home";

import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import LoanAll from "../pages/LoanAll/LoanAll";
import LoanDetails from "../components/Shared/LoanCard/LoanDetails";
import LoanForm from "../pages/LoanAll/LoanForm";
import MyLoan from "../pages/Dashboard/Borrower/Myloan";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";
import ManageLoans from "../pages/Dashboard/Manager/ManageLoans";
import PendingLoans from "../pages/Dashboard/Manager/PendingLoans";
import ApprovedLoans from "../pages/Dashboard/Manager/ApprovedLoans";
import UpdateLoans from "../pages/Dashboard/Manager/UpdateLoans";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllLoan from "../pages/Dashboard/Admin/AllLoan";
import LoanApplication from "../pages/Dashboard/Admin/LoanApplication";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/all-loans",
        element: <LoanAll></LoanAll>,
      },
      {
        path: "/all-loans",
        element: <LoanAll></LoanAll>,
      },
      {
        path: "/loan-details/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/loan-form/:id",
        element: <LoanForm></LoanForm>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
     
      {
        path: '/about-us',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/contact-us',
        element: <ContactUs></ContactUs>
      }
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
       {
        path: "manage-loans/update-loan/:id",
        element: <UpdateLoans></UpdateLoans>,
      },
      {
        path: "add-loan",
        element: (
          <PrivateRoute>
            <AddLoan></AddLoan>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-loans",
        element: (
          <PrivateRoute>
            <ManageLoans></ManageLoans>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <PrivateRoute>
            <PendingLoans></PendingLoans>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <PrivateRoute>
            <ApprovedLoans></ApprovedLoans>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-loan",
        element: (
          <PrivateRoute>
            <MyLoan />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "all-loan",
        element: <AllLoan></AllLoan>,
      },
      {
        path: "loan-applications",
        element: <LoanApplication></LoanApplication>,
      },
    ],
  },
]);
