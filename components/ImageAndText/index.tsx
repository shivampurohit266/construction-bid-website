// Gatsby requirements
import React from "react";

// Styles

const TextAndImage = (props:any) => {
    return (
        <div style={props.style} className={"section wrapper"}>
            {props.children}
        </div>
    );
};

export default TextAndImage;
