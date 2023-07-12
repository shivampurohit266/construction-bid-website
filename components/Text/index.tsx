// Gatsby requirements
import React from "react";

// Styles
// import * as CSS from "./index.module.scss";

const Text = (props:any) => {
    return (
        <div
            style={props.style}
            className={`
        wrapper
        ${props.h2 === "smaller" ? "smallerH2" : ""}
        ${props.li === "smaller" ? "smallerLists" : ""}
      `}
        >
            {props.children}
        </div>
    );
};

export default Text;
