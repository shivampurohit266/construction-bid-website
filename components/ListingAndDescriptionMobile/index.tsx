
import Link from "next/link";
import React, { useEffect } from "react";
import { getLanguagePrefix, getUiLanguage } from "../../utils/localization";
// import "./index.scss";

const ListingAndDescriptionDesktop = (props:any) => {
    const [data, setData] = React.useState(props.listItems);
    const [bkcolor, setBkColor] = React.useState("");
    const [button, setButton] = React.useState(props.button);
    const lang = getUiLanguage()

    useEffect(() => {
        setData(props.listItems);
        setButton(props.button)
      }, [lang]);

    const handleItemClick = (item:any, key:any) => {
        const temp = [...data];
        data.map((obj:any) => {
            obj.title === item.title
                ? (obj.description = props.listDescription[key])
                : (obj.description = "");
            return obj;
        });
        setBkColor(item.background);
        setButton(item.button);

        setData(temp);
    };

    return (
        <section className="all-in-one">
            <div className="container">
                <h2>{props.heading}</h2>

                {data &&
                    data.map((item:any, key:any) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <ul>
                                            <li
                                                onClick={() => {
                                                    handleItemClick(item, key);
                                                }}
                                                key={key}
                                                className={`li${key}`}
                                                style={{ background: item.background }}
                                            >
                                                <div className="wrapperForContent">
                                                    {props.counter && (
                                                        <span className="accordion-heading__numbers">
                                                            {key + 1}
                                                        </span>
                                                    )}

                                                    {item.title}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {item.description != "" && (
                                    <div className="row">
                                        <div className="col-lg-6 banner">
                                            <div
                                                className="create-text"
                                                style={{ background: bkcolor }}
                                            >
                                                <p className="description">{item.description}</p>

                                                {button?.map((item:any, index:number) => {
                                                    return (
                                                        <Link
                                                        key={index}
                                                            className="button-purple"
                                                            target="_blank"
                                                            href={item.buttonURL}
                                                        >
                                                            {item.buttonText}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })}
            </div>
        </section>
    );
};

export default ListingAndDescriptionDesktop;
