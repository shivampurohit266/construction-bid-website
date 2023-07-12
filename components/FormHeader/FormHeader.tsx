import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../images/Full-Logo-lighter.png";
import { getLanguagePrefix } from "../../utils/localization";

const FormHeader = () => {
    return (
        <div style={{ backgroundColor: "#fbf9f7",textAlign:"center" }}>
            <Link href={getLanguagePrefix("/")}>
                <Image
                    style={{ margin: "18px 10px 19px 10px", height: "45px", width: "197px" }}
                    src={Logo}
                    alt="logo"
                />
            </Link>
        </div>
    );
};

export default FormHeader;
