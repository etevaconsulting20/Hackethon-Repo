import React, { useState } from "react";

import product_icon from "./product_icon.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";



const ReadMore = (props) => {
    const { children } = props
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
            className="card ml-2 mr-2 border-0 rounded stProductCard"
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
            className = "stProductCard__cardText">
                {isFavourite ? (
                    <AiFillStar 
                        className = "stProductCard__cardText__aiFillStart"
                        onClick={onStarClick}
                    ></AiFillStar>
                ) : (
                    <AiOutlineStar
                        onClick={onStarClick}
                        className = "stProductCard__cardText__aiFillStart"
                    ></AiOutlineStar>
                )}
            </div>}

        </div>
    );
}