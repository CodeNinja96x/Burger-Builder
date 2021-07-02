import React from "react";

const ErrorComponent = ({error}) => {
    return <div>Error: {error.errorCode}</div>;
}

export default ErrorComponent;
