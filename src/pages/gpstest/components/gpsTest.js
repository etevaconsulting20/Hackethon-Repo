import React from "react";
import { useParams } from "react-router-dom";

function GPSTestView(props) {
    let { position } = useParams();
  return (
    <>
        <div>
            {position}
        </div>
    </>
  );
}

export default GPSTestView;
