import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CustomForm from "src/components/customForm";
// import FormLoader from "src/helpers/form-loader";

import {
  // getSpecificUserDetailsById,
  updateUserById,
  deleteSpecificUserByCustomerId,
} from "src/redux/thunks/userThunk.js";
import { getSpecificCustomerDetailsById } from "src/redux/thunks/productThunk";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InfoTab = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    // password: "",
    // confirmPassword: "",
    CustomerId: "",
  });
  const [customerDetails, setCustomerDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [deleteUserModalShow, setDeleteUserModalShow] = useState(false);

  const state = useSelector((state) => state.user);

  useEffect(() => {
    renderData();
    // getCustomerDetails();
  }, []);

  useEffect(() => {
    if (user.CustomerId) {
      getCustomerDetails();
    }
    return () => { };
  }, [user]);

  const renderData = () => {
    try {
      // dispatch(getSpecificUserDetailsById(params.id))
      //   .unwrap()
      //   .then((result) => {
      //     setUser(result.data);
      //     setLoader(false);
      //   });
    } catch (error) {

    }
  };

  const getCustomerDetails = () => {
    try {
      // dispatch(
      //   getSpecificCustomerDetailsById(state.specificUserData.CustomerId)
      // )
      //   .unwrap()
      //   .then((result) => {
      //     setCustomerDetails(result);
      //   });
    } catch (error) {

    }
  };

  const deleteUser = () => {
    handleDeleteUserButtonClose();
    dispatch(
      deleteSpecificUserByCustomerId({
        customerId: user.CustomerId,
        userId: params.id,
      })
    );
    navigate(location.state.url, { state: 1 });
  };

  const handleDeleteUserButtonClick = () => {
    setDeleteUserModalShow(true);
  };

  const handleDeleteUserButtonClose = () => {
    setDeleteUserModalShow(false);
  };

  return (
    <>
      {loader ? (
        <>
          {/* <FormLoader /> */}
        </>
      ) : (
        <div className="container-fluid scroll-with-tabs p-3">
          <CustomForm
            intialValues={user}
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
              // if (!values.phone) {
              //   errors.phone = "Phone No. is required";
              // } else {
              //   if (
              //     !values.phone.match(
              //       /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
              //     )
              //   ) {
              //     errors.phone = "Enter valid Phone No.";
              //   }
              // }
              // if (!values.password) {
              //   errors.password = "Password is required";
              // } else {
              //   if (values.password !== values.confirmPassword) {
              //     errors.password =
              //       "Password and Confirm Password must match";
              //   }
              // }
              // if (!values.customerId) {
              //   errors.customerId = "Please select Company Name";
              // }
              // else {
              //   if (values.customerId == "") {
              //     errors.customerId =
              //       "Password and Confirm Password must match";
              //   }
              // }
              return errors;
            }}
            onSubmit={async (values) => {
              const newValues = { ...values };
              try {
                await dispatch(updateUserById(newValues)).unwrap();
                navigate("/app/users/list");
              } catch (error) {

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
                      {errors.firstname &&
                        touched.firstname &&
                        errors.firstname}
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
                      disabled={true}
                      type="username"
                      name="username"
                      className="form-control"
                      id="exampleInputUsername1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email Address"
                      value={values.username}
                      onChange={handleInput}
                    />
                    <span className="errorMsg">
                      {errors.username && touched.username && errors.username}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <div className="row mt-4">
                      <a href="#!" className="forgot-password-link">
                        Change password?
                      </a>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                  <label htmlFor="contact" className="form-label">
                    Phone No.
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
                </div> */}
                  {/* <div className="col-md-6">
                      <label htmlFor="inputPassword1" className="form-label">
                        Set Password
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
                        Confirm Password
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
                    </div> */}

                  <div className="col-12">
                    <label htmlFor="inputCustomer" className="form-label">
                      Company name
                    </label>
                    <select
                      disabled={true}
                      name="customerId"
                      id="inputCustomer"
                      className="form-select"
                      aria-label="Default select example"
                      value={values.CustomerId}
                    // onChange={handleInput}
                    >
                      <option value={customerDetails.id}>
                        {customerDetails.name}
                      </option>

                      {/* <option disabled value="">Choose Company Name</option> */}
                      {/* {customerDetails &&
                          customerDetails[0] &&
                          customerDetails.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))} */}
                    </select>
                    <span className="errorMsg">
                      {errors.customerId &&
                        touched.customerId &&
                        errors.customerId}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    {values.isPrimary ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger text-white common-button"
                          // onClick={handleDeleteUserButtonClick}
                          disabled
                        >
                          Delete
                        </button>
                        <p className="text-danger">
                          *not able to delete as you are primary user
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger text-white common-button "
                        onClick={handleDeleteUserButtonClick}
                      >
                        Delete
                      </button>
                    )}
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary text-white common-button"
                        onClick={onSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          </CustomForm>
        </div>
      )}

      <Modal
        open={deleteUserModalShow}
        onClose={handleDeleteUserButtonClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete user ?
          </Typography>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              className="common-text"
              onClick={handleDeleteUserButtonClose}
            >
              No
            </Button>
            <Button className="common-text" onClick={deleteUser}>
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default InfoTab;
