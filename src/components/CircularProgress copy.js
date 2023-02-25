import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// CircularProgress.propTypes = {
//     /**
//      * Array percentage Values which you want to show in progress
//      */
//     /***/
//     values: PropTypes.arrayOf(PropTypes.number),

//     /**
//      * Interval after which Percentage value should change.
//      */
//     interval: PropTypes.number,

//     /**
//      *Size of container div in pixel eg:"100px".
//      */
//     size: PropTypes.string,
//     /**
//      * Color of progress bar.
//      */
//     color: PropTypes.string,
//     /**
//      * message to be shown below progress bar
//      */
//     message: PropTypes.string,
// };
CircularProgress.defaultProps = {
    values: [0, 10, 30, 40, 60, 70, 80, 90, 100],
    interval: 1000,
    size: "130px",
    color: "#cf2948",
};

export function CircularProgress({ values, interval, size, color, message }) {
    const [progress, changeProgress] = useState(0);
    var index = 0;
    useEffect(() => {
        const valueArray = values;
        if (valueArray.length !== 1) {
            var animation = setInterval(() => {
                if (index + 1 < valueArray.length) {
                    changeProgress(valueArray[index + 1]);
                    index = index + 1;
                } else {
                    clearInterval(animation);
                }
            }, interval);

            return () => {
                clearInterval(animation);
            };
        } else {
            changeProgress(valueArray[0]);
        }
    }, []);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: size,
                width: size,
                alignItems: "center",
            }}
        >
            <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: color,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: "#d6d6d6",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                    },
                    // Customize the text
                    text: {
                        // Text color
                        fill: color,
                        // Text size
                        fontSize: "16px",
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                        fill: "#3e98c7",
                    },
                }}
            />
            {message && <p style={{ fontSize: "16px", color: color }}>{message}</p>}
        </div>
    );
}