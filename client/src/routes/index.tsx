import {Route, Routes} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}/>
        {/*<Route element={<AuthRoute redirectPath='/home'/>}>*/}
        {/*    <Route path="/" element={<Login/>}/>*/}
        {/*    <Route path="/login" element={<Login/>}/>*/}
        {/*</Route>*/}
        {/*<Route element={<PrivateRoute redirectPath='/login'/>}>*/}
        {/*    <Route path="/home" element={<Home/>}/>*/}
        {/*</Route>*/}
    </Routes>
);

export default AppRoutes;