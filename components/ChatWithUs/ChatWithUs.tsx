import React from "react";
import { Button, Container } from "react-bootstrap";
// import ChatwithusBanner from "../../images/woman-picture.png"

const ChatWithUs = () => {
  return (
    <>
      <section className="chat_withus_section">
        <Container>
          <div className="chat_withus_box">
            <div className="chat_left">
              <h5>Didn't get an answer? Chat with us.</h5>
            </div>
            <div className="chat_btn">
              <Button className="start_chat_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-chat-left-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                </svg>
                Start Chat
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ChatWithUs;
