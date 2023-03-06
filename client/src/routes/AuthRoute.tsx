import React, {ReactElement} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

interface Props {
    redirectPath?: string;
    children?: ReactElement;
}

const AuthRoute = ({children, redirectPath='/home' }: Props) => {
    const {token} = useSelector(
        (state: any) => state.auth
    );
    const location = useLocation();
    if (token){
        return (<Navigate to={redirectPath} state={{ from: location }} />);
    }
    return children ? children : <Outlet />;

};

export default AuthRoute;