import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import FishForm from "./components/FishForm";



const ProductForm = () => {
    const dispatch = useDispatch();

    const state = useSelector(state => state)
    const { auth } = state
    const userRole = _.get(auth, "authUserInfo.jwtTokenDecode.role", "")



    return (
        <>
            {userRole === "Fish" && <FishForm />}
            {/* {userRole === "Fish" && <FishForm />} */}
        </>
    );
};
export default ProductForm;
