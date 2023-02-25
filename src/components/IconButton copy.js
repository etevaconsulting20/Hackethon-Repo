import React from 'react';
import PropTypes from "prop-types";
// import 'bootstrap/dist/css/bootstrap.css'

// IconButton.propTypes = {
//     /**
//      * text property for button text.
//      */
//     text: PropTypes.string,
//     /**
//      * icon that needs to react-icon icon component
//      */
//     icon: PropTypes.element,
//     /**
//      Event or function to be executed onClick
//      */
//     onClick: PropTypes.event,
//     /**
//      A boolean value indicating if something is loading or not. true-> spinner, false-> iconButton
//      */
//     loading: PropTypes.boolean
// }
IconButton.defaultProps = {
    text: "IconButton",
    icon: "MdAddCircle",
    onClick: () => alert('Hello'),
    loading: false,
    disable: false
}

export function IconButton({ text, icon, onClick, loading, disabled }) {
    const ICon = icon;

    if (loading) {
        return (
            <div onClick={() => onClick()} className="icon-button-container" style={{ marginLeft: "10px" }}>
                <div className="spinner-border spinner-border-sm text-danger" role="status"> </div>
                <span className="icon-button-text" style={{ fontSize: "12px" }}>{text}</span>
            </div>
        );
    }
    else {
        return (
            <div onClick={disabled ? undefined : () => onClick()} className="icon-button-container" disabled={disabled}
                style={{ marginLeft: "10px" }} >
                <ICon
                    color={'#CF2948'} size={24}
                />
                <span className="icon-button-text" style={{ fontSize: "12px",marginTop:2 }}>{text}</span>
            </div>
        );
    }

}


/*if(loading)
    { 
      return (
        <div>
        <div className= "spinner-border text-danger m-5" role="status">  
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>
      );
    }
else{
  return(
    <div onClick={()=>onClick()}  className="icon-button-container">
      if(loading)
      <ICon 
        color={'#CF2948'} size={24} 
      />
      <span className="icon-button-text" style={{fontSize:"12px"}}>{text}</span>
    </div>
  );
}*/