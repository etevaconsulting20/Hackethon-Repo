import React from "react";

import { BsChevronExpand } from "react-icons/bs";
import { Accordion, Card } from "react-bootstrap";


export function TabAccordion(props) {
    const { accordionData, isOpen } = props
    return (
        < >
            <Accordion defaultActiveKey={0} className="tabAccordion">
                {
                    accordionData && accordionData[0] && accordionData.map((item, index) => (
                        <Accordion.Item className="tabAccordion__item" eventKey={index}>
                            <Accordion.Header className="tabAccordion__item__header">
                                {item.title}
                            </Accordion.Header>
                            <Accordion.Body>
                                {item.tabs()}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
            {/* <Accordion 
                className="tabAccordion__accordion"
                data-testid="basic-tab-accordion-element"
                defaultActiveKey={isOpen ? 1 : 0}
            >
                {!!accordionData &&
                    accordionData.length > 0 &&
                    accordionData.map((data, i) => (
                        <>
                            <Card
                                key={i}
                                className="p-2 tabAccordion__accordion__accordionCard"
                            >
                                <Accordion.Toggle
                                className="tabAccordion__accordion__accordionCard__toggle"
                                    as={Card}
                                    eventKey={i + 1}
                                >
                                    <span
                                        className="tabAccordion__accordion__accordionCard_toggle__toggleSpan1"
                                    >
                                        {data.title}
                                    </span>

                                    <span className="tabAccordion__accordion__accordionCard_toggle__toggleSpan2">
                                        <BsChevronExpand className="tabAccordion__accordion__accordionCard_toggle__toggleSpan2__bsChevronExpand"/>
                                    </span>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey={i + 1}>
                                    <div className="m-2">
                                        <div key={i} className="m-1">
                                            <span
                                                className="tabAccordion__accordion__accordionCard__newsAndFeedbackSubtitle">
                                                {data.tabs()}
                                            </span>
                                            <br></br>
                                        </div>
                                    </div>
                                </Accordion.Collapse>
                            </Card>
                        </>
                    ))}
            </Accordion> */}
        </>
    );
}