import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Loader from "./utilty/Loader";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./utilty/PrivateRoute";
import PublicRoute from "./utilty/PublicRoute";
import DriverRegistration from "./pages/Driver/DriverRegistration";
import DriverView from "./pages/Driver/DriverView";
import CustomerTable from "./pages/Customer";
import CustomerView from "./pages/Customer/customerView";
const Login = lazy(() => import("./pages/Login"));
const Driver = lazy(() => import("./pages/Driver"));


function App() {
  return (
    <UserProvider>
      <Router>
        {/* <TokenHandler /> */}
         {/* 👈 Add this before <Suspense> */}
        <Suspense fallback={<Loader />}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
          <Routes>
            {/* Public Route */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/driver-management" element={<Driver />} />
                <Route path="/driver-register" element={<DriverRegistration />} />
                <Route path="/customer" element={<CustomerTable />} />
                <Route path="customer-view" element={<CustomerView />} />
                <Route path="/booking-management" element={<Driver />} />
                <Route path="/dashboard" element={<Driver />} />
                <Route path="/driver-view" element={<DriverView />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
