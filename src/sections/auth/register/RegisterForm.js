import { useState } from "react";

// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components
import Iconify from "../../../components/iconify";

// form validation
import { useFormInputValidation } from "react-form-input-validation";

// password / confirm password verification
import PasswordChecklist from "react-password-checklist";

// phone number validation
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
// ** Redux Import
import { useSelector, useDispatch } from "react-redux";
import { RECEPTION_REGISTER } from "src/actions/auth";
import { ageCalculate } from "src/common/ageCalculate";
import moment from "moment";
import { LoaderFile } from "src/common/loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const auth_token = useSelector(
    (state) => state.auth_token.auth_token.payload
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [fields, errors, form] = useFormInputValidation(
    {
      firstName: "",
      lastName: "",
      userName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      addressOfArea: "",
      dob: "",
      age: "",
    },
    {
      firstName: "required|alpha|min:3",
      lastName: "required|alpha|min:3",
      userName: "required|alpha|min:3",
      emailAddress: "required|email",
      password: "required",
      confirmPassword: "required",
      phoneNumber: "required",
      addressOfArea: "required|min:15",
      dob: "required|date",
      age: "",
    }
  );

  const age = ageCalculate(moment(fields.dob).format("MM-DD-YYYY"));

  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    const requestData = {
      payload: { ...fields, age: age },
      header: auth_token,
    };
    if (age < 18) {
      setAgeError("Age must be greate than 17");
    } else {
      if (isValid) {
        setLoading(true);
        await dispatch(
          RECEPTION_REGISTER(requestData, (res) => {
            if (res?.response?.data?.error.includes("userName")) {
              toast.error("Username already exist");
            } else if (res?.response?.data?.error.includes("emailAddress")) {
              toast.error("Email address already exist");
            } else if (res?.message) {
              toast.success("Receiption Registered");
              navigate("/login");
            }
            setLoading(false);
          })
        );
      }
    }
  };

  const handleInputChange = (value, data, formattedValue) => {
    fields.phoneNumber = `+${data.dialCode} ${value.slice(
      data.dialCode.length
    )}`;
  };

  return (
    <>
      <form className="myForm" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            name="firstName"
            label="First Name"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.firstName ? errors.firstName : ""}
          </InputLabel>
          <TextField
            name="lastName"
            label="Last Name"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.lastName ? errors.lastName : ""}
          </InputLabel>
          <TextField
            name="userName"
            label="Username"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.userName ? errors.userName : ""}
          </InputLabel>
          <TextField
            name="emailAddress"
            label="Email address"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.emailAddress ? errors.emailAddress : ""}
          </InputLabel>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.password ? errors.password : ""}{" "}
          </InputLabel>
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showConfirmPassword
                          ? "eva:eye-fill"
                          : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {" "}
            {errors.confirmPassword ? errors.confirmPassword : ""}
          </InputLabel>
          <PasswordChecklist
            rules={["number", "match", "capital", "specialChar", "minLength"]}
            minLength={10}
            value={fields.password}
            valueAgain={fields.confirmPassword}
            messages={{
              minLength: "Password has atleast 10 characters.",
              specialChar: "Password has a special characters.",
              number: "Password has a number.",
              capital: "Password has a captial letter.",
              match: "Both password are matched.",
            }}
          />

          <PhoneInput
            country={"in"}
            value={fields?.phoneNumber}
            copyNumbersOnly={false}
            onChange={handleInputChange}
            enableSearch={true}
            inputStyle={{ width: "100%" }}
            inputProps={{
              name: "phoneNumber",
            }}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.phoneNumber ? errors.phoneNumber : ""}
          </InputLabel>
          <TextField
            name="addressOfArea"
            label="Address"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">
            {errors.addressOfArea ? errors.addressOfArea : ""}
          </InputLabel>
          <TextField
            name="dob"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
            type="date"
          />
          <InputLabel className="error">
            {errors.dob ? errors.dob : ""}
          </InputLabel>
          <TextField
            name="age"
            label="Age"
            type="number"
            value={`${age}`}
            disabled={true}
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
          />
          <InputLabel className="error">{ageError}</InputLabel>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>
        {!loading ? (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={errors === null || isEmpty(errors) ? false : true}
          >
            Sign up
          </LoadingButton>
        ) : (
          <LoaderFile />
        )}
      </form>
    </>
  );
}
