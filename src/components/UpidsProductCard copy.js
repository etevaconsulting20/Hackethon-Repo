import React from "react";
import PropTypes from "prop-types";
import upids_product_icon from "./upids_product_icon.png";
import "./upids-product-card.css";

// UpidsProductCard.propTypes = {
//     /**
//      * Src property for image to be used.
//      */
//     imageSrc: PropTypes.any,
//     /**
//      * Text that needs to be rendered under card
//      */
//     productUpids: PropTypes.any,
//     /**
//      * Height of card
//      */
//     height: PropTypes.string,
//     /**
//      * Widtht of card
//      */
//     width: PropTypes.string,
//     /**
//      * Height of image inside the card
//      */
//     imageHeight: PropTypes.string,
//     /**
//      * Width of image inside the card
//      */
//     imageWidth: PropTypes.string,
//     /** Give Heading to your card */
//     productName: PropTypes.string,
// };

function addDefaultSrc(ev) {
    ev.target.src = upids_product_icon;
}

export function UpidsProductCard({
    imageSrc,
    productUpids,
    height,
    width,
    imageHeight,
    imageWidth,
    onClick,
    productName,
}) {
    return (
        <div
            data-testid="Upids_product_card"
            onClick={onClick}
            onError={addDefaultSrc}
            className="card ml-2 mr-2 upids-product-card"
            style={{
                height: height ? height : "auto",
                width: width ? width : "auto",
                marginBottom: "16px",
                cursor: "pointer",
                backgroundColor: "#eff8fd",
                opacity: 1,
                padding: "1px",
            }}
        >
            <img
                style={{
                    height: imageHeight ? imageHeight : 136,
                    width: imageWidth ? imageWidth : "auto",
                    padding: "1px",
                }}
                src={imageSrc}
                className="card-img-top border border-1 border-top-0 border-end-0 border-start-0 border-bottom-0"
                alt="..."
            />
            <div
                className="card-text"
                style={{
                    padding: "10px",
                    color: "#354052",
                    
                }}
            >
                {productName ? productName : ""}
            </div>
            <div
                // className="rounded-bottom"
                style={{
                    padding: "10px",
                    fontSize: "12px",
                    color: "#354052",
                    
                }}
            >
                {productUpids ? productUpids : ""}
            </div>
        </div>
    );
}