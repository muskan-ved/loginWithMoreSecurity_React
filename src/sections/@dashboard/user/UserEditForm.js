import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// @mui
import {
  Stack,
  TextField,
  InputLabel,
  InputAdornment,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useDispatch, useSelector } from "react-redux";
import { VISITOR_LIST_BY_ID, VISITOR_UPDATE } from "src/actions/visitor";
import { RECEPTION_LOGOUT } from "src/actions/auth";
import { toast } from "react-toastify";
import { LoaderFile } from "src/common/loader";
import PhoneInput from "react-phone-input-2";

// ----------------------------------------------------------------------

export default function UserEditForm() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    Name: "",
    age: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    purposeToVisit: "",
  });

  const [errors, setErrors] = useState({
    Name: "",
    age: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    purposeToVisit: "",
  });

  const ReduxStore = useSelector((state) => state);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    handleGetDataById();
  }, []);

  const handleGetDataById = async () => {
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      id: id,
    };
    setLoading(true);
    await dispatch(
      VISITOR_LIST_BY_ID(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        } else if (res.status === 200) {
          setData({
            Name: res.data.Name,
            age: res.data.age,
            emailAddress: res.data.emailAddress,
            phoneNumber: res.data.phoneNumber,
            address: res.data.address,
            purposeToVisit: res.data.purposeToVisit,
          });
        } else{
			toast.error(res?.message);
        }
		setLoading(false);
      })
    );
  };

  const handleOnChange = (e) => {
    let validRegexForEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (e.target.value === "") {
      setErrors({ ...errors, [e.target.name]: "required*" });
      setData({ ...data, [e.target.name]: "" });
    } else if (e.target.name === "phoneNumber") {
      if (e.target.value.length === 10) {
        setErrors({
          ...errors,
          [e.target.name]: "phoneNumber number must be 10",
        });
      }
    } else if (
      e.target.name === "emailAddress" &&
      !e.target.value.match(validRegexForEmail)
    ) {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "provide a valid email" });
    } else if (e.target.name === "age" && e.target.value < 18) {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "Age must be greate than 17" });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleInputChange = (value, phonedata, formattedValue) => {
    phonedata.phoneNumber = `+${phonedata.dialCode} ${value.slice(
      phonedata.dialCode.length
    )}`;
    if (value) {
      setData({ ...data, phoneNumber: phonedata.phoneNumber });
      setErrors({ ...errors, phoneNumber: "" });
    } else {
      setData({ ...data, phoneNumber: "" });
      setErrors({ ...errors, phoneNumber: "required*" });
    }
  };

  const onSubmit = async () => {
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      id: id,
      payload: data,
    };
	setLoading(true);
    await dispatch(
      VISITOR_UPDATE(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
		} else if (res.status === 200) {
		toast.success("Visitor Updated");
          setTimeout(() => {
			  window.history.back();
			}, 1000);
		} else{
		  toast.error(res?.message);
        }
		setLoading(true);
      })
    );
  };

  const btnValidation = Object.values(errors).find((item) => item !== "");

  if (loading) {
    return <LoaderFile />;
  }
  return (
    <>
      <Stack spacing={1} className="stack" marginTop={3}>
        <Typography variant="h4" marginBottom={4}>
          Edit Visitor Detail
        </Typography>
        <TextField
          name="Name"
          label="Name"
          value={data.Name}
          onChange={(e) => handleOnChange(e)}
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
          onChange={(e) => handleOnChange(e)}
          value={data.emailAddress}
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
          value={data?.phoneNumber}
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
        />
        <InputLabel className="error">
          {errors.phoneNumber ? errors.phoneNumber : ""}
        </InputLabel>
        <TextField
          type="number"
          name="age"
          label="Age"
          onChange={(e) => handleOnChange(e)}
          value={data.age}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PermContactCalendarIcon />
              </InputAdornment>
            ),
          }}
        />
        <InputLabel className="error">
          {errors.age ? errors.age : ""}
        </InputLabel>
        <TextField
          name="address"
          label="Address"
          value={data.address}
          onChange={(e) => handleOnChange(e)}
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
          value={data.purposeToVisit}
          onChange={(e) => handleOnChange(e)}
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
        sx={{ mt: 2 }}
      >
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          sx={{ mr: 2 }}
          onClick={onSubmit}
          disabled={btnValidation === undefined ? false : true}
        >
          Update Visitor
        </LoadingButton>
      </Stack>
    </>
  );
}
