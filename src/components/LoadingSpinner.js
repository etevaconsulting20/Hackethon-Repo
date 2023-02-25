import React from "react";

function LoadingSpinner() {
  return (
    <div className="loadingOverlay">
      <div className="loadingOverlay__background" />
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="sr-only">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
