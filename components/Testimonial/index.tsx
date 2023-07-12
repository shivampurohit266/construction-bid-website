import React from "react";
// import "./index.scss";

const Testimonial = (props:any) => {
    console.log(props);
    return (
        <section className="testimonial-section">
            <div className="container">
                <h2>{props.heading}</h2>
                {props.children}
            </div>
        </section>
    );
};

export default Testimonial;
