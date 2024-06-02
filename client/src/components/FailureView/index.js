import React from "react";
import { MdError } from "react-icons/md";

const ErrorComponent = () => {
    return(
        <div className="flexColCenter" style={{height:"40vh"}}>
            <MdError size={110} style={{margin:"30px"}}/>
            <span className="primaryText" style={{fontSize:"1.5rem"}}>Error while fetching data</span>
        </div>
    )
};

export default ErrorComponent;