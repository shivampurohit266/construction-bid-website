import Image from 'next/image'
import React from 'react'
// import './index.scss'
const BannerAndListing = (props:any) => {
  return (
    <section className="run-project">
        <div className="container">
            <h2>{props.heading}</h2>
            <div className="sub-text">{props.description} </div>

            <div className="row">
                <div className="col-md-5">
                    {props.children}
                </div>
                <div className="col-md-5">
                    <Image src={props.image} alt="" />
                </div>
            </div>
        </div>

    </section>
  )
}

export default BannerAndListing