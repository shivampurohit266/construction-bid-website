import Image from "next/image";
import React from "react";
// import "./index.scss";

const Hero = (props:any) => {
    return (
        <section className={`banner ${props.styleClass}`}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-lg-6"}>{props.children}</div>
                    {props.img && (
                        <div className={"col-lg-6"}>
                            <Image
                                loading="eager"
                                src={props.img}
                                alt={props.alt}
                                className={"banner-img"}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
