import React from "react";
import { Accordion, Card, } from "react-bootstrap";
import { BsChevronExpand } from "react-icons/bs";


export function Accordion(props) {
  const { accordionData } = props
  return (
    <div>
      <Accordion
        data-testid="basic-acordionn-element"
        className="stAccordion"
        defaultActiveKey={1}
      >
        {!!accordionData &&
          accordionData.length > 0 &&
          accordionData.map((data, i) => (
            <>
              <Card key={i} className="p-2 accordionCard stAccordion__card" >
                <Accordion.Toggle
                  as={Card}
                  eventKey={i + 1}
                  className="stAccordion__card__toggle"
                >
                  <span className="font-weight-bold stAccordion__card__toggle__title">
                    {data.title}
                  </span>

                  <span className="stAccordion__card__toggle__content" >
                    <BsChevronExpand style={{ width: 18, height: 18 }} />
                  </span>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={i + 1}>
                  <div className="m-2">
                    {data.documentationValues.map((text) => (
                      <div key={i} className="m-1">
                        <span className="stAccordion__card__collapse" >
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