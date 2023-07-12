import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowUp from "../../images/VectorArrowUp.svg";
import ArrowDown from "../../images/VectorArrowDown.svg";
import { FaAngleDown, FaAngleUp, FaArrowDown } from "react-icons/fa";
// import "./index.scss";
const Teams = (props: any) => {
  const [showButton, setShowButton] = React.useState("");

  const CustomerAccordion = (props: any) => {
    // const [showButton, setShowButton] = React.useState(false);

    return (
      <>
        {/* <p>{showButton && props.description}</p> */}
        {/* {showButton ? (
          <Image
            src={ArrowUp}
            alt={"ArrowUp"}
            style={{ cursor: "pointer" }}
            onClick={() => setShowButton(!showButton)}
          />
        ) : (
          <Image
            src={ArrowDown}
            alt={"ArrowDOwn"}
            style={{ cursor: "pointer" }}
            onClick={() => setShowButton(!showButton)}
          />
          // <FaAngleDown
          //     style={{ cursor: "pointer" }}
          //     onClick={() => setShowButton(!showButton)}
          // />
        )} */}
      </>
    );
  };
  const showDisc = (key: any) => {
    console.log("key=>", key);

    if (key == showButton) {
      setShowButton("");
    } else {
      setShowButton(key);
    }
  };

  return (
    <section className="our-team">
      <div className="container">
        <h2>{props.heading}</h2>
        <div className="team-text">{props.description}</div>
        {props.team &&
          props.team.map((item: any, key: any) => {
            return (
              <div
                className="team-row"
                key={key}
                onClick={() => showDisc(item.name)}
              >
                <Image src={item.image} alt="" />
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="link-info">
                    <p>{item.role}</p>
                    <Link href={item.linkedIn} target="_blank">
                      LinkedIn
                    </Link>
                  </div>
                  {/* <CustomerAccordion description={item.description} /> */}
                  <>
                    <p>{item.description}</p>
                    {/* <p>{showButton == item.name && item.description}</p> */}
                    {/* {showButton == item.name ? (
                    <Image
                      src={ArrowUp}
                      alt={"ArrowUp"}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <Image
                      src={ArrowDown}
                      alt={"ArrowDOwn"}
                      style={{ cursor: "pointer" }}
                    />
                  )} */}
                  </>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Teams;
