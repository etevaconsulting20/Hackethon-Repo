import React, { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoIosHelpCircleOutline } from "react-icons/io";

const UpdatingPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
      popper.scheduleUpdate();
    }, [children, popper]);

    return (
      <Popover ref={ref} body {...props}>
        {children}
      </Popover>
    );
  }
);

function CustomTooltip(props) {
  const { trigger, tooltipContent } = props;

  return (
    <OverlayTrigger
      trigger={["hover","click","focus"]}
      placement="auto" 
      delay={{show : 700, hide : 0}}
      overlay={
        <UpdatingPopover id="popover-contained">
          <div className="toolTipContent p-3 rounded shadow">
            {tooltipContent}
          </div>
        </UpdatingPopover>
      }
    >
      <span>
        {
          trigger ?
            <>
              {trigger}
            </>
            :
            <>
              <IoIosHelpCircleOutline
                role="button"
                style={{color: "#6c757d"}}
                className="ml-2 mb-2"
                fontWeight={"bold"}
              />
            </>
        }

      </span>
    </OverlayTrigger>
  );
}

export default CustomTooltip;
