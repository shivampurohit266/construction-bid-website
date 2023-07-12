import React, { useEffect } from "react";
import { CloseButton } from "react-bootstrap";

const Modal = (props:any) => {
    useEffect(() => {
        setTimeout(() => {
            props.closeModal();
        }, 7000);
    });
    return (
        <div
        className="d-flex flex-row-reverse modal_inner_box"
            style={{ backgroundColor: props.status ? "#32CD32" : "#E38299", padding: "1rem", textAlign: "center", margin: "0 auto" }}
        >
            <CloseButton onClick={() => props.closeModal()} />
            <p className="mb-0">{props.modalContent}</p>
        </div>
    );
};

export default Modal;
