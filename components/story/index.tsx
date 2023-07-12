import React from "react";
// import "./index.scss";
const Story = (props: any) => {
  return (
    <section className="story-section">
      <div className="container">
        <h2>{props.heading}</h2>
        <div className="timeline">
          <div className="date-block">
            {props.story &&
              props.story.map((item: any, key: any) => {
                return (
                  <>
                    <div key={key} className="date">
                      <div className="year">{item.year}</div>
                      <div className="d-text">{item.founded}</div>
                    </div>
                    <p key={key + 1}>{item.description}</p>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
