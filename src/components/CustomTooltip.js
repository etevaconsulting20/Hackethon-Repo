import React, { useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

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
    },
);


function CustomTooltip(props) {
    const { trigger, tooltipContent } = props


    return (
        <OverlayTrigger
            // trigger="hover"
            overlay={
                <UpdatingPopover id="popover-contained">
                    {tooltipContent}
                </UpdatingPopover>
            }
        >
            <span > 
                {trigger}
            </span>
        </OverlayTrigger>
    );
}

export default CustomTooltip