import React from "react";
import PropTypes from "prop-types";
import { BsChevronExpand } from "react-icons/bs";
import { Accordion, Card, Button } from "react-bootstrap";

// STAccordion.propTypes = {
//   /** Give an array to your accordion  */
//   accordionData: PropTypes.array,
// };

export function STAccordion({ accordionData }) {
  
  return (
    <div>
      <Accordion
        data-testid="basic-acordionn-element"
        style={{ margin: 10 }}
        defaultActiveKey={1}
      >
        {!!accordionData &&
          accordionData.length > 0 &&
          accordionData.map((data, i) => (
            <>
              <Card
                key={i}
                className="p-2 accordionCard"
                style={{
                  margin: "5px",
                  borderRadius: "15px",
                  opacity: "1px",
                  backgroundColor: "#ffffff",
                  padding: "10px 18px 7px 18px",
                  borderStyle: "solid",
                  borderWidth: "1.5px",
                  borderColor: "#DFEDF5",
                }}
              >
                <Accordion.Toggle
                  as={Card}
                  eventKey={i + 1}
                  style={{
                    height: 40,
                    justifyContent: "center",
                    padding: 5,
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <span
                    className="font-weight-bold"
                    style={{ fontWeight: "700" }}
                  >
                    {data.title}
                  </span>

                  <span style={{ position: "absolute", right: 0 }}>
                    <BsChevronExpand style={{ width: 18, height: 18 }} />
                  </span>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={i + 1}>
                  <div className="m-2">
                    {data.documentationValues.map((text) => (
                      <div key={i} className="m-1">
                        <span
                          className="newsAndFeedbackSubtitle"
                          style={{
                            display: "inline-block",
                            
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#6489a0",
                            marginLeft: "5px",
                          }}
                        >
                          {text}
                        </span>
                        <br></br>
                      </div>
                    ))}
                  </div>
                </Accordion.Collapse>
              </Card>
            </>
          ))}
      </Accordion>
    </div>
  );
}