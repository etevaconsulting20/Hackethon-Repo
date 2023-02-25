import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signinAction } from "src/redux/thunks/authThunk";
import Logo from "src/assets/images/brand-logo/upids-satellite-logo.png";
import SupportIcon from "src/assets/images/login/Component_25.svg"
import supportIcon from "src/assets/images/login/Component_25.svg";
import { Spinner } from "react-bootstrap";
import contentLeftImage from "src/assets/images/login/Login_Diagram.svg";
import SupportOutsideCheck from "./components/SupportOutsideCheck";
import menuButton from "src/assets/images/login/Menu.svg";
import menuCloseButton from "src/assets/images/login/Menu_close.svg";
import VisiblityWrapper from "./components/VisiblityWrapper";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";


function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const supportCardRef = useRef();
  const supporTextRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [isKeepLoggedIn, setIsKeepLoggedIn] = useState(false)

  SupportOutsideCheck(supportCardRef, supporTextRef, setShowSupport);


  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const goToPrivacyPolicy = () => {
    window.open(
      'https://www.secondthought.fi/privacy-policy/',
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  const gotoForgetPassword = () => {
    window.open(
      "https://pdm.upids.io/#/resetpassword",
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  const gotoSignup = () => {
    window.open(
      '"https://pdm.upids.io/#/signup"',
      '_blank' // <- This is what makes it open in a new window.
    );
  }




  // // Formik Hooks----------------------------------------------------------
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

      password: Yup.string()
        .required(t("Required")),


    }),
    // submit function
    onSubmit: async (values) => {
      try {
        setLoader(true);
        const res = await dispatch(signinAction({ ...values, isKeepLoggedIn })).unwrap();
        setLoader(false);
        navigate("/app");
      } catch (error) {
        setLoader(false);
      }
    },
  });
  // // destructuring variable & function from formik Object 
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, resetForm } = formik




  return (
    <div className="container-fluid loginPage">
      <div className="loginPage__header row">
        <div className="loginPage__header__image">
          <img src={Logo} alt="logo" />
          <span className="loginPage__header__subtitle">Suite for Product Management</span>
        </div>
        <div className="loginPage__header__supportContainer">
          <img src={SupportIcon} alt="supportIcon" />
          <span ref={supporTextRef} onClick={() => setShowSupport(!showSupport)}>Need Support?</span>
        </div>
        <div className="loginPage__header__languageSelect pl-0">
          <select onChange={handleLangChange} className="form-select" aria-label="Default select example">
            <option id="en" value="en">English</option>
            <option id="fi" value="fi">Finnish</option>
          </select>
        </div>

        {!showMenu ?
          <img alt="alt" onClick={() => setShowMenu(!showMenu)} src={menuButton} className="loginPage__header__menuButton" />
          :
          <img alt="alt" onClick={() => setShowMenu(!showMenu)} src={menuCloseButton} className="loginPage__header__menuButton" />
        }
      </div>


      <div ref={supportCardRef} className={"supportContent ui card" + (!showSupport ? " supportContent__fadeOut" : " supportContent__fadeIn")}>
        <p className="title">{t('Happy to Help')}</p>
        <div style={{ marginTop: 20 }}>
          <p className="subtitle">{t('EMAIL US')}</p>
          <p className="text">support@secondthought.fi</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <p className="subtitle">{t('Call Us')}</p>
          <p className="text">+358 45 7832 7251</p>
        </div>
      </div>


      <div className={"menu-card-content" + (showMenu ? " menu-card-content-slide-down" : " menu-card-content-slide-up")}>
        <p className="menu-title">{t('AkkadAI is Unique Product Identification Service stores rich data about product lifecycle')}</p>
        <div className="divider"></div>
        <div className="menu-content">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img alt="alt" src={supportIcon} className="support-logo" />
            <span style={{ marginLeft: 16, fontWeight: 'bold', alignSelf: 'center' }}>
              {t("Need support ?")}

              {/* <TextWithLink text={t('Need Support ?')} color="dark" /> */}
            </span>
          </div>

          <div style={{ marginTop: 23 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}><p className="menu-subtitle">{t('Email Us')}</p><p className="menu-text">support@secondthought.fi</p></div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}><p className="menu-subtitle" >{t('Call Us')}</p><p className="menu-text">+358 45 7832 7251</p></div>
          </div>
        </div>

        <div className="divider"></div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ fontWeight: 'bold', fontSize: 14, color: '#182631', textDecorationLine: 'underline' }}>{t('Privacy Policy')}</p>
          {/* <p style={{ fontWeight: 'bold', fontSize: 14, color: '#182631', textDecorationLine: 'underline', textAlign: 'right', marginLeft: 50 }}>{t('Terms of Use')}</p>
                <p style={{ fontWeight: 'bold', fontSize: 14, color: '#182631', textDecorationLine: 'underline', textAlign: 'right', marginLeft: 50 }} onClick={() => history.push("/swagger/public")}>API</p> */}
        </div>
        <p className="menu-footer mt-1">{t('All Right Reserved @ 2022 Second Thought Ltd')}</p>
      </div>

      <div className="loginPage__mainSection">
        <div className="loginPage__mainSection__left">
          <div className="loginPage__mainSection__left__image">
            <img src={contentLeftImage} />
          </div>
        </div>
        <div className="loginPage__mainSection__right col-sm-6 col-md-5">
          <p className="loginPage__mainSection__right__header">
            {t("Trace the product lifecycles, at each single step at atomic level")}
          </p>
          <div className="login-wrapper">
            <h2 className="login-title">Sign in</h2>
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
                <p className="login-input-error"  >
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

              <div className="keep-login-container">
                {isKeepLoggedIn ? (
                  <MdCheckBox
                    onClick={() => setIsKeepLoggedIn(false)}
                    style={{ cursor: "pointer" }}
                    color="#ffffff"
                    size={24}
                  />
                ) : (
                  <MdCheckBoxOutlineBlank
                    onClick={() => setIsKeepLoggedIn(true)}
                    style={{ cursor: "pointer" }}
                    color="#203441"
                    size={24}
                  />
                )}
                <label className="keep-login-label" >
                  {t("Keep me logged in")}
                </label>
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
                    t("LOGIN")
                  ) : (
                    <Spinner animation="border" variant="light" />
                  )}
                </button>
              </div>
              <a onClick={gotoForgetPassword} className="forgot-password-link">
                Forgot password?
              </a>
            </form>
            <p className="login-wrapper-footer-text">
              Need an account?{" "}
              <a onClick={gotoSignup} className="text-reset signup-link">
                Signup here
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="loginPage__footer">
        <div>
          <p >{t('All Right Reserved @ 2022 Second Thought Ltd')}</p>
        </div>
        <div>
          <p style={{ marginLeft: 26, cursor: 'pointer' }} onClick={() => goToPrivacyPolicy()}>{t('Privacy Policy')}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
