import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const index = () => {
  return (
    <>
      <section className="startwith_search">
        <Container>
          <div className="withsearch_box">
            <div className="Search_title">
              <h4>Start with search</h4>
            </div>
            <div className="searchwith_input">
              <Form className="d-flex align-items-center search_inner_from">
                <Form.Control
                  type="search"
                  placeholder="Question, links, how it works"
                  className=""
                  aria-label="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default index;
