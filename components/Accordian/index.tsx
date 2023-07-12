import React from "react";
import { Accordion, Container } from "react-bootstrap";

const Accordian = (props: any) => {
  return (
    <Container>
      <Accordion defaultActiveKey="">
        <h3>{props.title}</h3>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Vesiputket</Accordion.Header>
          <Accordion.Body>
            <div className="content--que-ans">
              <div>
                {" "}
                <span>Q.</span>Milloin tehty?
              </div>
              <div>
                <span>A.</span>1995
              </div>
            </div>

            <div className="content--que-ans">
              <div>
                <span>Q.</span>Montako vesipistettä tilaan tarvitaan remontin
                jälkeen?
              </div>
              <div>
                <span>A.</span>105 kpl
              </div>
            </div>

            <div className="content--que-ans">
              <div>
                <span>Q.</span>Montako vesipistettä tilassa on tällä hetkellä?
              </div>
              <div>
                <span>A.</span>125 kpl
              </div>
            </div>

            <div className="content--que-ans">
              <div>
                <span>Q.</span>Tarviiko näitä tai näiden paikkaa muuttaa?
              </div>
              <div>
                <span>A.</span>Kyllä
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Viemäri</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Lattiarakenne</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Seinärakenne</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Sähköt</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Muut</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Saadaksesi pitäviä tarjouksia ilman katselmuksia, liitä mukaan kuvat
            seuraavista
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>
            Remonttiin liittyvät yleiset kysymykset
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>Muut</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>
            Saadaksesi pitäviä tarjouksia ilman katselmuksia, liitä mukaan kuvat
            seuraavista:
          </Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Accordian;
