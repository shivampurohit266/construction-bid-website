import React from "react";
// import "./index.scss";

const Pricing = (props:any) => {
    return (
        <section className={`pricing-section ${props.styleClass ?? ""}`}>
            <div className="container">
                <h2>{props.heading}</h2>
                {props.children}
            </div>
        </section>
    );
};

export default Pricing;
