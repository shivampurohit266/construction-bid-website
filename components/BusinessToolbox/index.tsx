import Image from "next/image";
import React from "react";
// import "./index.scss";

const BusinessToolbox = (props: any) => {
  return (
    <section className="toolbox-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Image src={props.img} alt={props.alt} className="pro-mockup" />
          </div>
          <div className="col-md-6">{props.children}</div>
        </div>
      </div>
    </section>
  );
};

export default BusinessToolbox;
