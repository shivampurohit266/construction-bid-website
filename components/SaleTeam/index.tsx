import Image from "next/image";
import React from "react";
// import "./index.scss";
import { useLocalization } from "../../utils/localization";

const SaleTeam = (props:any) => {
    const [t, language] = useLocalization();

    return (
        <section className="contact-info">
            <div className="container">
                {props.children}
                <div className="team-row">
                    <h2>{t("pages.contactUs.TeamSaleSecondSectionHeadng")}</h2>
                    <div className="row">
                        {props.teamSale &&
                            props.teamSale.map((item:any, key:any) => {
                                return (
                                    <div className="col-md-4" key={key}>
                                        <div className="team-thumb">
                                            <Image src={item.image} alt="" />
                                            <h3>{item.name}</h3>
                                            <p>{item.role}</p>
                                            <a href={`mailto:${item.email}`}>{item.email}</a>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaleTeam;
