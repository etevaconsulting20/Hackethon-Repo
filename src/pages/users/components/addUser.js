import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Searchbox } from "src/components/searchbox";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomForm from "src/components/customForm";

// Thunk
import { addUserAction } from "src/redux/thunks/userThunk.js";

function UserCreate() {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, I18n] = useTranslation();

  const [loader, setLoader] = useState(true);
  const [displayData, setDisplayData] = useState();
  const [iValues, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    customerId: "",
  });

  const state = useSelector((state) => state.user);

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    try {
      // dispatch(getAllCustomersData())
      //   .unwrap()
      //   .then((result) => {
      //     setDisplayData(result.data);
      //     setLoader(false);
      //   });
    } catch (error) {
      
    }
  };

  return (
    <>
      <div
        className={`p-2 container-fluid d-flex flex-row justify-content-between bg-primary text-white`}
      >
        <h4>{t("sidebar.users")}</h4>
      </div>

      <div className="container-fluid scroll-without-tabs p-3">
        <CustomForm
          intialValues={iValues}
          validate={(values) => {
            let errors = {};
            if (!values.firstname) {
              errors.firstname = "First Name is required.";
            }
            if (!values.lastname) {
              errors.lastname = "Last Name is required";
            }
            if (!values.username) {
              errors.username = "Email is required";
            } else {
              if (
                !values.username.match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
              ) {
                errors.username = "Enter valid username";
              }
            }
            if (!values.phone) {
              errors.phone = "Phone No. is required";
            } else {
              if (
                !values.phone.match(
                  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                )
              ) {
                errors.phone = "Enter valid Phone No.";
              }
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else {
              if (values.password !== values.confirmPassword) {
                errors.password = "Password and Confirm Password must match";
              }
            }
            if (!values.customerId) {
              errors.customerId = "Please select Company Name";
            } else {
              if (values.customerId === "") {
                errors.customerId = "Password and Confirm Password must match";
              }
            }
            return errors;
          }}
          onSubmit={async (values) => {
            const newValues = { ...values };
            delete newValues.confirmPassword;
            try {
              setLoader(true);
              await dispatch(addUserAction(newValues)).unwrap();
              setLoader(false);
              navigate("/app/users/list");
            } catch (error) {
              setLoader(false);
              ref.current.focus();
            }
          }}
        >
          {({ onSubmit, handleInput, values, errors, touched }) => {
            return (
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="firstname" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    id="firstname"
                    placeholder="Enter First Name"
                    value={values.firstname}
                    onChange={handleInput}
                  />
                  <span className="errorMsg">
                    {errors.firstname && touched.firstname && errors.firstname}
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastname" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    id="lastname"
                    placeholder="Enter Last Name"
                    value={values.lastname}
                    onChange={handleInput}
                  />
                  <span className="errorMsg">
                    {errors.lastname && touched.lastname && errors.lastname}
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="username"
                    name="username"
                    ref={ref}
                    className="form-control"
                    id="exampleInputUsername1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email Address"
                    value={values.username}
                    onChange={handleInput}
                  />
                  {state.usernameError ? (
                    <span className="errorMsg">{state.usernameError}</span>
                  ) : (
                    ""
                  )}
                  <span className="errorMsg">
                    {errors.username && touched.username && errors.username}
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Phone no.
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="123-456-7890"
                    value={values.phone}
                    onChange={handleInput}
                  />
                  <span className="errorMsg">
                    {errors.phone && touched.phone && errors.phone}
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword1" className="form-label">
                    Set password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword1"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleInput}
                  />
                  <span className="errorMsg">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword2" className="form-label">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    id="inputPassword2"
                    placeholder="Enter Password"
                    value={values.confirmPassword}
                    onChange={handleInput}
                  />
                  <span className="errorMsg">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>
                <div className="col-12">
                  <label htmlFor="inputCustomer" className="form-label">
                    Company name
                  </label>
                  <select
                    name="customerId"
                    id="inputCustomer"
                    className="form-select"
                    aria-label="Default select example"
                    value={values.customerId}
                    onChange={handleInput}
                  >
                    <option disabled value="">
                      Choose company name
                    </option>
                    {displayData &&
                      displayData[0] &&
                      displayData.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <span className="errorMsg">
                    {errors.customerId &&
                      touched.customerId &&
                      errors.customerId}
                  </span>
                </div>
                <div className="d-flex justify-content-end col-12 mb-3">
                  <button
                    type="button"
                    className="btn btn-primary text-white common-button"
                    onClick={onSubmit}
                  >
                    Add user
                  </button>
                </div>
              </form>
            );
          }}
        </CustomForm>
      </div>
    </>
  );
}

export default UserCreate;
