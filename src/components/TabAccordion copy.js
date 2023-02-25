import React from "react";

import { BsChevronExpand } from "react-icons/bs";
import { Accordion, Card } from "react-bootstrap";
import PropTypes from "prop-types";

// TabAccordion.propTypes = {
//     /** Give an array to your accordion  */
//     accordionData: PropTypes.array,
//     /** Pass this parameter to keep your accordion closed by default */
//     isOpen: PropTypes.bool,
// };

TabAccordion.defaultProps = {
    isOpen: true,
};

export function TabAccordion({ accordionData, isOpen }) {
    return (
        <div>
            <Accordion
                data-testid="basic-tab-accordion-element"
                style={{ margin: 10 }}
                defaultActiveKey={isOpen ? 1 : 0}
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
                                                {data.tabs()}
                                            </span>
                                            <br></br>
                                        </div>
                                    </div>
                                </Accordion.Collapse>
                            </Card>
                        </>
                    ))}
            </Accordion>
        </div>
    );
}