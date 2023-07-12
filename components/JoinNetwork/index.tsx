import Image from "next/image";
import React from "react";
// import "./index.scss";

const JoinNetwork = (props:any) => {
    return (
        <section className={"join-network"}>
            <div className={"container"}>
                <h2>{props.heading}</h2>
                <div className={"row align-items-center"}>
                    <div className={"col-md-4"}>
                        <Image src={props.img} alt={props.alt} />
                    </div>
                    <div className={"col-md-8"}>{props.children}</div>
                </div>
            </div>
        </section>
    );
};

export default JoinNetwork;
