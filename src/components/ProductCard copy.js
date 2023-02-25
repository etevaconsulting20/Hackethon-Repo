import React, { useState } from "react";
import PropTypes from "prop-types";
import product_icon from "./product_icon.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


// ProductCard.propTypes = {
//     /**
//      * Src property for image to be used.
//      */
//     imageSrc: PropTypes.any,
//     /**
//      * Text that needs to be rendered under card
//      */
//     content: PropTypes.any,
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
//     /** Change the star Icon */
//     isFavourite: PropTypes.bool,
// };

const ReadMore = ({ children }) => {
    const text = children;
    if (text.length > 70) {
        return (
            <p className="text">
                {text.slice(0, 70)}
                <span> ...</span>
            </p>
        );
    } else {
        return <p>{text}</p>;
    }
};
function addDefaultSrc(ev) {
    ev.target.src = product_icon;
}

export function ProductCard({
    imageSrc,
    content,
    height,
    width,
    imageHeight,
    imageWidth,
    onClick,
    isFavourite,
    onStarClick,
}) {
    return (
        <div
            onError={addDefaultSrc}
            className="card ml-2 mr-2 border-0 rounded"
            style={{
                height: height ? height : "auto",
                width: width ? width : "auto",
                marginBottom: "16px",
                cursor: "pointer",
            }}
        >
            <img
                style={{
                    height: imageHeight ? imageHeight : 136,
                    width: imageWidth ? imageWidth : "auto",
                }}
                src={imageSrc}
                className="card-img-top border border-1 border-top-0 border-end-0 border-start-0"
                alt="..."
                onClick={onClick}
            />

            <div className="card-text text-center" onClick={onClick}>
                <span>{content ? <ReadMore>{content}</ReadMore> : <br />}</span>
            </div>
            {isFavourite === undefined ? " " : <div
                style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    color: "rgb(108, 117, 125)",
                }}
            >
                {isFavourite ? (
                    <AiFillStar
                        style={{ color: "rgb(252, 186, 3)", height: "1em", width: "1em", fontSize: 18, fontWeight: 20 }}
                        onClick={onStarClick}
                    ></AiFillStar>
                ) : (
                    <AiOutlineStar
                        onClick={onStarClick}
                        style={{ height: "1em", width: "1em", fontSize: 18, fontWeight: 20 }}
                    ></AiOutlineStar>
                )}
            </div>}

        </div>
    );
}