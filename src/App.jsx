import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Loader from "./utilty/Loader";
const Login = lazy(() => import("./pages/Login"));
import "./App.css";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./utilty/PrivateRoute";
import PublicRoute from "./utilty/PublicRoute";
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
                <Route path="/customer" element={<Driver />} />
                <Route path="/booking-management" element={<Driver />} />
                <Route path="/dashboard" element={<Driver />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
