import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import TimePicker from "react-bootstrap-time-picker";
const today = new Date();

const ScheduleForm = () => {
  const [typeDate, setTypeDate] = useState("text");
  const [typeTime, setTypeTime] = useState("text");
  return (
    <>
      <section className="schedule_form_section">
        <Container>
          <h3>Want a call back? Schedule appointment below</h3>
          <Form className="schedule_form_field">
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridName">
                {/* <Form.Label>Email</Form.Label> */}
                <Form.Control type="text" placeholder="Your Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="email">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="email" placeholder="Email ID" />
              </Form.Group>
            </Row>
            <Row className="mb-4 date_time">
              <Form.Group as={Col} controlId="formGridtime">
                {/* <Form.Label>Email</Form.Label> */}
                <Form.Control
                  onFocus={() => setTypeTime("time")}
                  type={typeTime}
                  placeholder="Available time"
                />
                {/* <TimePicker start="10:00" end="21:00" step={30} /> */}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDate">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  placeholder="Available date"
                  onFocus={() => setTypeDate("date")}
                  type={typeDate}
                />

                {/* <DatePicker
                  selected={value}
                  onChange={(date: Date) => onChange(date)}
                  placeholderText={"Please select a date"}
                  minDate={today}
                /> */}
              </Form.Group>
            </Row>

            <Form.Group className="mb-4" controlId="formGridSubject">
              {/* <Form.Label>Address</Form.Label> */}
              <Form.Control placeholder="Subject for call" />
            </Form.Group>

            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" placeholder="Message" rows={4} />
            </Form.Group>

            <Button variant="schedule_submit" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default ScheduleForm;
