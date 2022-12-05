import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// @mui
import { Stack, TextField, InputLabel, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormInputValidation } from "react-form-input-validation";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { VISITOR_ADD } from "src/actions/visitor";
import { RECEPTION_LOGOUT } from "src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { isEmpty } from "lodash";
import { LoaderFile } from "src/common/loader";


// ----------------------------------------------------------------------

UserForm.propTypes = {
  handleVisitorList: PropTypes.func,
};

export default function UserForm({handleVisitorList}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ReduxStore = useSelector((state) => state);
  const [ageError, setAgeError] = useState("");
  const [loading, setLoading] = useState(false);


  const [fields, errors, form] = useFormInputValidation(
    {
      Name: "",
      age: "",
      emailAddress: "",
      phoneNumber: "",
      address: "",
      purposeToVisit: "",
    },
    {
      Name: "required|min:3",
      age: "required|numeric",
      emailAddress: "required|email",
      phoneNumber: "required",
      address: "required|min:15",
      purposeToVisit: "required",
    }
  );

  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      payload: fields,
    };    
    if (isValid) {
    if (fields.age < 18) {
      setAgeError("Age must be greate than 17");
    } else{
      setLoading(true);
    await dispatch(
      VISITOR_ADD(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        }else if (res?.response?.data?.error?.includes("emailAddress")) {
          toast.error("Email address already exist");
        } else if (res?.response?.data?.message) {
          toast.error(res?.response?.data?.message);
        } else if(res.status === 200){
          toast.success("New Visitor Added");
          navigate('/dashboard/visitor')
        }else {
          toast.error('Failed to add new visitor');
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
        <form
          className="myForm"
          onSubmit={onSubmit}
        >
          <Stack spacing={1} className="stack" marginTop={3}>
          <Typography variant="h4" marginBottom={4}>Add New Visitor </Typography>
            <TextField
              name="Name"
              label="Name"
              onChange={form.handleChangeEvent}
              onBlur={form.handleBlurEvent}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel className="error">
              {errors.Name ? errors.Name : ""}
            </InputLabel>
            <TextField
              name="emailAddress"
              label="Email address"
              onChange={form.handleChangeEvent}
              onBlur={form.handleBlurEvent}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel className="error">
              {errors.emailAddress ? errors.emailAddress : ""}
            </InputLabel>
            <PhoneInput
           country={"in"}
           value={fields?.phoneNumber}
           copyNumbersOnly={false}
           onChange={handleInputChange}
           enableSearch={true}
           inputStyle={{ width: "100%" }}
           inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
             name: "phoneNumber",
           }}
           onBlur={form.handleBlurEvent}
        />
            <InputLabel className="error">
              {errors.phoneNumber ? errors.phoneNumber : ""}
            </InputLabel>
            <TextField
              type="number"
              name="age"
              label="Age"
              onChange={form.handleChangeEvent}
              onBlur={form.handleBlurEvent}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermContactCalendarIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel className="error">
              {errors.age ? errors.age :  ageError ? ageError : ''}
            </InputLabel>
            <TextField
              name="address"
              label="Address"
              onChange={form.handleChangeEvent}
              onBlur={form.handleBlurEvent}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel className="error">
              {errors.address ? errors.address : ""}
            </InputLabel>
            <TextField
              name="purposeToVisit"
              label="Purpose To Visit"
              onChange={form.handleChangeEvent}
              onBlur={form.handleBlurEvent}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel className="error">
              {errors.purposeToVisit ? errors.purposeToVisit : ""}
            </InputLabel>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{mt:2}}
            >
           {!loading ? (
             <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            disabled={errors === null || isEmpty(errors) ? false : true}
            >
            Add Visitor
          </LoadingButton>
        ) : (
          <LoaderFile />
          )}
          </Stack>
        </form>
    </>
  );
}
