
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import "./index.scss";
const OurServices = (props:any) => {
    return (
        <section className="renovation">
            <div className="container">
                <h2>{props.heading}</h2>

                {props.servicesArray &&
                    props.servicesArray.map((item:any, key:any) => {
                        return (
                            <div className="row" key={key}>
                                <div className="col-lg-5">
                                    <Image src={item.image} alt="" />
                                </div>
                                <div className="col-lg-6">
                                    <h3>{item.tittle}</h3>
                                    <p>{item.description}</p>
                                    {item.buttonName != "" && (
                                        <Link href={item.link} className="get-btn">
                                            {item?.buttonName}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default OurServices;
