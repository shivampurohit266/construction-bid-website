import React from "react";
import FormFooter from "./FormFooter/FormFooter";
import FormHeader from "./FormHeader/FormHeader";
function FormLayout(props: any) {
  // console.log("propssss=>", props);

  return (
    <>
      <FormHeader />
      {props.children}
      {props.props &&
      (props.props.ip.country_name === "Finland" ||
        props.props.ip.country_name === "Spain" ||
        props.props.ip.country_name === "") ? (
        <FormFooter />
      ) : !props.props ? (
        <FormFooter />
      ) : null}
    </>
  );
}

export default FormLayout;
