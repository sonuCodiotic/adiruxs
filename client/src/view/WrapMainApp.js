import React from "react";
import { Redirect } from "react-router-dom";

export default function WrapMainApp({ children, location }) {
    const token = localStorage.getItem("__token__");
    if (token !== null && token !== undefined) {
        let flag = true;

        if (flag) {
            return children;
        } else {
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { massage: "Route Not Found", from: location.pathname },
                    }}
                />
            );
        }
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { massage: "You must be login", from: location.pathname },
                }}
            />
        );
    }
}
