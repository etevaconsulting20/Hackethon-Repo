import { values } from "lodash";
import { func } from "prop-types";
import * as yup from "yup";


export const loginSchema = yup.object().shape({
  email: yup.string().required("Username required"),
  password: yup.string().required("Password required"),
});

export const emailYuSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Enter a valid Email"),
});

export const userRegisterSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Enter a valid Email"),
  foreName: yup.string().required("Forename required"),
  sureName: yup.string().required("Surname required"),
  phoneNumber: yup.string().required("Phone Number required")
    .matches(/^(\+?\d{0,4})?\s?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Number must be between 7 to 14 digits, alphabets not allowed."),
  companyName: yup.string().required("Company name required"),
  businessId: yup.string().required("Business id required"),
  timezone: yup.string().required("Timezone required"),
  password: yup.string().required("Password required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
  confirmPassword: yup.string().required("Retype password required").oneOf([yup.ref("password"), null], "Password Must Match"),
});

export const newPasswordSchema = yup.object({
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const resetPassSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Invalid Email."),
});

function isValidBusinessId(message) {
  return this.test("isValidBusinessId", message, function (value) {
    const { path, createError } = this;
    if (!value) {
      return createError({ path, message: message ?? "Business Id required" });
    }
    if (value.find(({ type }) => type === 'VATID')) {
      return true;
    }
    else {
      return createError({ path, message: message ?? "Please add VATID" });
    }
    return true;
  });
}

function isValidBusinessIdArray(message) {
  return this.test("isValidBusinessIdArray", message, function (value) {
    const { path, createError } = this;
    if (value === undefined || value === null || value.length === 0) {
      return createError({ path, message: message ?? "Business Id required" });
    }
    return true;
  });
}

function checkSecureUrl(message) {
  return this.test("checkSecureUrl", message, function (value) {
    const { path, createError } = this;
    const weburlRegEx = /(https:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    if (value && value !== "" && !weburlRegEx.test(value)) {
      return createError({ path, message: message ?? "Website URL should be valid" });
    } else if (value && value !== "" && !value.includes("https://")) {
      return createError({ path, message: message ?? "Website URL should be secured" });
    }
    return true;
  });
}

yup.addMethod(yup.array, "isValidBusinessId", isValidBusinessId)
yup.addMethod(yup.array, "isValidBusinessIdArray", isValidBusinessIdArray)
yup.addMethod(yup.string, "checkSecureUrl", checkSecureUrl)

export const addProductSchemaGtin = yup.object().shape({
  gtin: yup.number().test('len', 'Must be exactly 8 or 12 or 13 or 14 characters', val => (val.toString().length === 8 || val.toString().length === 12 || val.toString().length === 13 || val.toString().length === 14)),
  websiteUrl: yup.string().checkSecureUrl(),
});

export const addProductSchema = yup.object().shape({
  // gtin: yup.string().matches(/^(\d{14})$/, "GTIN should be 14 digits"),
  websiteUrl: yup.string().checkSecureUrl(),
});


export const companySchema = yup.object().shape({
  name: yup.string().required("Company name required"),
  businessIdentifiers: yup.array().isValidBusinessId(),
  address: yup.string().required("Address required"),
  contact: yup.string().required("Contact Details required"),
  // apiKey: yup.string().required("API key required"),
  countryCode: yup.string().required("Country code required"),
});

export const companyEditSchema = yup.object().shape({
  name: yup.string().required("Company name required"),
  businessIdentifiers: yup.array().isValidBusinessIdArray(),
  address: yup.string().required("Company Address required"),
  contact: yup.string().required("Contact Details required"),
});

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address required")
    .email("Enter a valid Email"),
  foreName: yup.string().required("First Name required"),
  sureName: yup.string().required("Last Name required"),
  companyId: yup.string().required("Company required"),
  admin: yup.string()
    .when("userLevel", {
      is: value => value && value === 10 || value === 1,
      then: yup.string()
        .required("Please set admin flag to true")
    }),
  // userLevel: yup.string().required("User Type required"),
  // companyName: yup.string().required("Company Name required"),
  // companyId: yup.string().required("Company Id required"),
  phoneNumber: yup.string().required("Phone Number required").matches(
    /^(\+?\d{0,4})?\s?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    "Number must be between 7 to 14 digits, alphabets not allowed."
  ),
  timezone: yup.string().required("Timezone required"),
  newPassword: yup
    .string()
    .required("Password required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  retypePassword: yup
    .string()
    .required("Retype password required")
    .oneOf([yup.ref("newPassword"), null], "Password Must Match"),
});

export const userEditSchema = yup.object().shape({
  foreName: yup.string().required("First Name required"),
  sureName: yup.string().required("Last Name required"),
  // name: yup.string().required("Company Name required"),
  // businessId: yup.string().required("Company Id required"),
  phoneNumber: yup.string().required("Phone Number required").matches(
    /^(\+?\d{0,4})?\s?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    "Number must be between 7 to 14 digits, alphabets not allowed."
  ),
  password: yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  retypePassword: yup.string()
    .when("password", {
      is: value => value && value.length > 0,
      then: yup.string()
        .required("Retype Password Required")
        .oneOf([yup.ref("password"), null], "Password Must Match"),

    }),
});

export const ownUserEditSchema = yup.object().shape({
  foreName: yup.string().required("First Name required"),
  sureName: yup.string().required("Last Name required"),
  phoneNumber: yup.string().required("Phone Number required").matches(
    /^(\+?\d{0,4})?\s?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    "Number must be between 7 to 14 digits, alphabets not allowed."
  ),

});

export const addUpidsProductSchema = yup.object().shape({
  sse: yup.string().required("Smart Segment Extension required"),
});



export const productUpdateSchema = yup.object().shape({
  websiteUrl: yup.string().checkSecureUrl(),
});

export const productUpdateSchemaGtin = yup.object().shape({
  websiteUrl: yup.string().checkSecureUrl(),
  gtin: yup.number().test('len', 'Must be exactly 8 or 12 or 13 or 14 characters', val => (val.toString().length === 8 || val.toString().length === 12 || val.toString().length === 13 || val.toString().length === 14)),
});
