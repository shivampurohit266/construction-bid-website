import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const BasicModal = (props: any) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  });

  console.log(props.modalBody, "test");

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        id="year_offer"
        className={props.className}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalBody}</Modal.Body>
      </Modal>
    </>
  );
};

export default BasicModal;
