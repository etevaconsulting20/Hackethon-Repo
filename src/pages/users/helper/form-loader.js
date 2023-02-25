import React from "react";
import { Skeleton } from "@mui/material";

const FormLoader = () => {
  return (
    <div className="container-fluid scroll p-3">
      <form disabled className={`row g-3 smartpipe_form`}>
        <div className="col-md-6">
          <Skeleton animation="wave" sx={{ marginTop: -0.925 }} width={70} height={33.35} />
          <Skeleton animation="wave" sx={{ marginTop: -1.5 }} height={63.34} />
        </div>
        <div className="col-md-6">
          <Skeleton animation="wave" sx={{ marginTop: -0.925 }} width={70} height={33.35} />
          <Skeleton animation="wave" sx={{ marginTop: -1.5 }} height={63.34} />
        </div>
        <div className="col-md-6">
          <Skeleton animation="wave" sx={{ marginTop: -0.925 }} width={70} height={33.35} />
          <Skeleton animation="wave" sx={{ marginTop: -1.5 }} height={63.34} />
        </div>
        <div className="col-md-6">
          <Skeleton animation="wave" sx={{ marginTop: -0.925 }} width={70} height={33.35} />
          <Skeleton animation="wave" sx={{ marginTop: -1.5 }} height={63.34} />
        </div>
        <div className="col-12">
          <Skeleton animation="wave" sx={{ marginTop: -0.925 }} width={70} height={33.35} />
          <Skeleton animation="wave" sx={{ marginTop: -1.5 }} height={63.34} />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <Skeleton animation="wave" sx={{ marginTop: -3.1 }} width={77.6} height={63.34} />
        </div>
      </form>
    </div>
  );
};

export default FormLoader;
