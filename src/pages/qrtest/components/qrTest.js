import React from "react";

function QRTestView(props) {
    const scannedCode = props.scannedCode;
    const latitude = props.latitude;
    const longitude = props.longitude;

  return (
    <>
        <div className="row">
            <div className="col-3">
              Scanned code:
            </div>
            <div className="col-9">
              {scannedCode}
            </div>
        </div>
        <div className="row">
            <div className="col-3">
              Latitude:
            </div>
            <div className="col-9">
              {latitude}
            </div>
        </div>
        <div className="row">
            <div className="col-3">
              Longitude:
            </div>
            <div className="col-9">
              {longitude}
            </div>
        </div>

    </>
  );
}

export default QRTestView;
