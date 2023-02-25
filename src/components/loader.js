import React from "react";

function Loader() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center loading">
      <div className="spinner-border text-primary" role="status"></div>
      <span className="p-2 h5 sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
