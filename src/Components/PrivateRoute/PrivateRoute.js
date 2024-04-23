import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../Hook/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ? children :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}

                ></Redirect>

            }
        >


        </Route>
    );
};

export default PrivateRoute;