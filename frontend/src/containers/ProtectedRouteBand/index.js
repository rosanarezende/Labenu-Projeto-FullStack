import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteBand = ({ component: Component, ...rest }) => {
    const userRole = localStorage.getItem("userRole")
        
    const getRedirectProps = (location) => ({
        pathname: "/login",
        from: location
    })

    return (
        <Route
            {...rest}
            render={props => {
                return userRole === "BAND"
                    ? (<Component {...props} />)
                    : (<Redirect to={getRedirectProps(props.location)} />)
            }}
        />
    )
}

export default ProtectedRouteBand