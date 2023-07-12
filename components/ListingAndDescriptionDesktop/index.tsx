
import Link from "next/link";
import React, { useEffect } from "react";
import { getLanguagePrefix, getUiLanguage } from "../../utils/localization";
// import "./index.scss";

const ListingAndDescription = (props:any) => {
    const [description, setDescription] = React.useState(props.description);
    const [bkcolor, setBkColor] = React.useState("");
    const [button, setButton] = React.useState(props.button);
    const lang = getUiLanguage()

    useEffect(() => {
        setDescription(props.description);
        setButton(props.button)
      }, [lang]);
    console.log("desc=>", lang );

    return (
        <section className="all-in-one">
            <div className="container">
                <h2>{props.heading}</h2>

                <div className="row">
                    <div className="col-lg-6">
                        <ul>
                            {props.listItems &&
                                props.listItems.map((item:any, key:any) => {
                                    return (
                                        <li
                                            onClick={() => {
                                                setDescription(item.description);
                                                setBkColor(item.background);
                                                setButton(item.button);
                                            }}
                                            key={key}
                                        >
                                            <div className="wrapperForContent">
                                                {props.counter && (
                                                    <span className="accordion-heading__numbers">
                                                        {++key}
                                                    </span>
                                                )}

                                                {item.title}
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                        
                    </div>
                    

                    <div className="col-lg-5 banner">
                        <div className="create-text" style={{background: bkcolor}}>
                            <p>{description}</p>
                            
                            { 
                             button?.map((item:any, index:number)=>{ 
                             return( <Link
                             key={index}
                                className="button-purple"
                                target="_blank"
                                href={item.buttonURL}
                            >
                       
                                {item.buttonText}
                            </Link>
                             )}
                )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ListingAndDescription;
