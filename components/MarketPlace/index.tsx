import Image from "next/image";
import React from "react";
// import "./index.scss";

const MarketPlace = (props:any) => {
    return (
        <section className="marketplace-section">
            <div className="container">
                {props.heading && props.headingDescription && (
                    <div className="marketplace-heading">
                        <h1>{props.heading}</h1>
                        <p>
                            {props.headingDescription}
                        </p>
                    </div>
                )}

                <div className="row">
                    <div className="col-lg-8">
                        <Image src={props.img} alt={props.alt} className="marketplace-img" />
                    </div>
                    <div className="col-lg-4">{props.children}</div>
                </div>
            </div>
        </section>
    );
};

export default MarketPlace;
