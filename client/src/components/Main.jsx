import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Home from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import PageNotFound from "./auth/PageNotFound";
import Community from "./CommunityHub/Community";
import AuthProtected from "./partials/AuthProtected";
import Protected from "./partials/Protected";
import Dashboard from "./app/Dashboard";
import Profile from './app/Profile';
import Domains from "./Domains/Domains";
import Order from "./app/Order";
import Success from "./Reusable/Success";
import ServiceInfo from "./SellerService/ServiceInfo";
import RegisterSeller from "./Register_Seller/RegisterSeller";
import AdDashBoard from './admin-d/AdDashBoard';
import RegisterGig from './gigPosting/RegisterGig';
import BlogList from './blogs/BlogList';
import BlogDetail from './blogs/BlogDetail';
import { useSelector } from 'react-redux'
import SellerDash from './seller-analytics/SellerDash';
import UserDash from './User/UserDash';
import AdminApproval from './admin-d/AdminApproval';

const Main = () => {
    const { currentUser } = useSelector(store => store.user)
    console.log(currentUser)

    return <>
        <ToastContainer />
        <Navbar />
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="community-hub" element={<Community />} />
                <Route path="explore" element={<Domains />} />
                <Route path="explore/:param" element={<Domains />} />
                <Route path="success" element={<Success />} />
                <Route path="blogs" element={<BlogList />} />
                <Route path="blogs/:blogId" element={<BlogDetail />} />
            </Route>

            <Route path="/auth" element={<AuthProtected />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>

            <Route path="/order/:id" element={<Order />} />

            <Route path="/services/:service_id" element={<ServiceInfo />} />

            <Route path="/app" element={<Protected />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="register" element={<RegisterSeller />} />

                {/* for sellers separately */}
                <Route path="create-gig" element={currentUser && currentUser.user_type=='seller' && <RegisterGig />} />
                <Route path="analytics" element={ currentUser && currentUser.user_type=='seller' ?  <SellerDash /> : <UserDash />} />
            </Route>

            <Route path='/admin' element={<Protected />}>
                <Route path='dashboard' element={<AdDashBoard />} />
                <Route path='toBeApproved' element={<AdminApproval />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
    </>
}

export default Main
