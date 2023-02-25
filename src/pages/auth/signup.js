import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAuthStatusAction,
  signinAction,
  signupAction,
} from "src/redux/thunks/authThunk";
import Logo from "src/assets/images/brand-logo/upids-satellite-logo.png";
import SupportIcon from "src/assets/images/login/Component_25.svg";
import supportIcon from "src/assets/images/login/Component_25.svg";
import { Spinner } from "react-bootstrap";
import contentLeftImage from "src/assets/images/login/Login_Diagram.svg";
import SupportOutsideCheck from "./components/SupportOutsideCheck";
import menuButton from "src/assets/images/login/Menu.svg";
import menuCloseButton from "src/assets/images/login/Menu_close.svg";
import VisiblityWrapper from "./components/VisiblityWrapper";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { auth } from "src/config/firebaseConfig";

function SignUp() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const supportCardRef = useRef();
  const supporTextRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  SupportOutsideCheck(supportCardRef, supporTextRef, setShowSupport);

  const gotoSignin = () => {
    navigate("/login");
  };

  const formik = useFormik({
    // initial value
    initialValues: {
      username: "",
      password: "",
    },

    // vlidation-----------------------------------------------------------
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t("Required"))
        .email(t("Please enter a valid email")),

      password: Yup.string().required(t("Required")),
    }),
    // submit function
    onSubmit: async (values) => {
      try {
        setLoader(true);
        const res = await dispatch(signupAction({ ...values })).unwrap();

        dispatch(getAuthStatusAction());
        setLoader(false);
        navigate("/app");
      } catch (error) {
        console.error({ error });
        setLoader(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = formik;

  return (
    <div className="container-fluid loginPage">
      <div className="loginPage__header row">
        <div className="loginPage__header__image">
          <img src={Logo} alt="logo" />
          <span className="loginPage__header__subtitle">
            Suite for Product Management
          </span>
        </div>

        {!showMenu ? (
          <img
            alt="alt"
            onClick={() => setShowMenu(!showMenu)}
            src={menuButton}
            className="loginPage__header__menuButton"
          />
        ) : (
          <img
            alt="alt"
            onClick={() => setShowMenu(!showMenu)}
            src={menuCloseButton}
            className="loginPage__header__menuButton"
          />
        )}
      </div>

      <div
        className={
          "menu-card-content" +
          (showMenu
            ? " menu-card-content-slide-down"
            : " menu-card-content-slide-up")
        }
      >
        <p className="menu-title">
          {t(
            "AkkadAI is Unique Product Identification Service stores rich data about product lifecycle",
          )}
        </p>
        <div className="divider"></div>
        <div className="menu-content">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img alt="alt" src={supportIcon} className="support-logo" />
            <span
              style={{
                marginLeft: 16,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {t("Need support ?")}

              {/* <TextWithLink text={t('Need Support ?')} color="dark" /> */}
            </span>
          </div>
        </div>

        <div className="divider"></div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 14,
              color: "#182631",
              textDecorationLine: "underline",
            }}
          >
            {t("Privacy Policy")}
          </p>
        </div>
        <p className="menu-footer mt-1">
          {t("All Right Reserved @ 2022 Second Thought Ltd")}
        </p>
      </div>

      <div className="loginPage__mainSection">
        <div className="loginPage__mainSection__left">
          <div className="loginPage__mainSection__left__image">
            <img src={contentLeftImage} />
          </div>
        </div>
        <div className="loginPage__mainSection__right col-sm-6 col-md-5">
          <p className="loginPage__mainSection__right__header">
            {t(
              "Trace the product lifecycles, at each single step at atomic level",
            )}
          </p>
          <div className="login-wrapper">
            <h2 className="login-title">Sign Up</h2>
            <form className="mb-5 login-form">
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={"login-input"}
                  placeholder={t("Email")}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="login-input-error">
                  {errors.username && touched.username && errors.username}
                </p>
              </div>

              <div className="form-group mb-3">
                <VisiblityWrapper setPasswordType={setPasswordType}>
                  <input
                    type={passwordType}
                    name="password"
                    id="password"
                    className={"login-input"}
                    placeholder={t("Password")}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </VisiblityWrapper>
                <p className="login-input-error">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <button
                  name="login"
                  id="login"
                  className="login-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  {!loader ? (
                    t("Sign Up")
                  ) : (
                    <Spinner animation="border" variant="light" />
                  )}
                </button>
              </div>
            </form>
            <p className="login-wrapper-footer-text">
              Already Have an account?{" "}
              <a onClick={gotoSignin} className="text-reset signup-link">
                Sign In here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
