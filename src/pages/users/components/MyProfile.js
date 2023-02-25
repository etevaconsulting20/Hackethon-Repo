import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "src/redux/thunks/userThunk";
import AddUserImage from "src/assets/images/addUser.png";
import { InputTextWithLabel } from "src/components/InputTextWithLabel";
import { InputSelectDropdown } from "src/components/InputSelectDropdown";

function MyProfile() {
  const dispatch = useDispatch();
  const userProfileInfo = useSelector((state) => state.user.usersData);
  let selectTimezoneOption = [];

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <div className="container myProfile">
      <div className="row add-user main-container">
        <div className="add-user sidebar-container col-xl-3 col-xxl-4 col-md-4">
          <img
            alt="alt"
            src={AddUserImage}
            className="add-user profile-image"
          ></img>
          <span className="add-user profile-name">
            {userProfileInfo &&
              userProfileInfo.foreName + " " + userProfileInfo.sureName}
          </span>
        </div>
        <div className="add-user form-container col-xl-9 col-xxl-8 col-md-8">
          <form className="container">
            <div className="row m-1">
              <InputTextWithLabel
                label={"Email Address"}
                readOnly={true}
                name={"email"}
                value={userProfileInfo.email}
                type="text"
                placeholder={"Email"}
              // errorMsg={
              //   !!errorObject && errorObject.name ? errorObject.name : ""
              // }
              ></InputTextWithLabel>

              <InputTextWithLabel
                label={"First Name"}
                readOnly={true}
                name={"foreName"}
                value={userProfileInfo.foreName}
                type="text"
                placeholder={"First Name"}
              // errorMsg={
              //   !!errorObject && errorObject.name ? errorObject.name : ""
              // }
              ></InputTextWithLabel>

              <InputTextWithLabel
                label={"Last Name"}
                readOnly={true}
                name={"sureName"}
                value={userProfileInfo.sureName}
                type="text"
                placeholder={"Last Name"}
              // errorMsg={
              //   !!errorObject && errorObject.name ? errorObject.name : ""
              // }
              ></InputTextWithLabel>

              <InputTextWithLabel
                label={"Company"}
                readOnly={true}
                name={"Company"}
                value={userProfileInfo.companyName}
                type="text"
                placeholder={"Company"}
              // errorMsg={
              //   !!errorObject && errorObject.name ? errorObject.name : ""
              // }
              ></InputTextWithLabel>

              <InputTextWithLabel
                label={"Phone"}
                readOnly={true}
                name={"phoneNumber"}
                value={userProfileInfo.phoneNumber}
                type="text"
                placeholder={"Phone"}
              // errorMsg={
              //   !!errorObject && errorObject.name ? errorObject.name : ""
              // }
              ></InputTextWithLabel>

              {/* <InputSelectDropdown
                label={"Timezone"}
                placeholder="Select Timezone"
                value={userProfileInfo.abbr}
                name="countryCode"
                search={true}
                // disabled={_state.isUserEditMode ? false : true}
                dropdownOptions={selectTimezoneOption}
              // onChange={handleTimezoneSelect}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
