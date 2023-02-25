import React from "react";

import upids_product_icon from "./upids_product_icon.png";
import "./upids-product-card.css";


export function UpidsProductCard(props) {
   const {
        imageSrc,
        productUpids,
        height,
        width,
        imageHeight,
        imageWidth,
        onClick,
        productName,
    } = props
    return (
        <div
            data-testid="Upids_product_card"
            onClick={onClick}
            onError={addDefaultSrc}
            className="card ml-2 mr-2 upids-product-card"
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
                className="card-text upids-product-card__cardText">
                {productName ? productName : ""}
            </div>
            <div
                className="upids-product-card__cardText2"
                // className="rounded-bottom"
            >
                {productUpids ? productUpids : ""}
            </div>
        </div>
    );
}