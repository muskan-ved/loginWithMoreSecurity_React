import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import { RECEPTION_LOGOUT } from "src/actions/auth";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderFile } from "src/common/loader";
import { RECEPTIONIST_BY_ID, RECEPTIONIST_UPDATE } from "src/actions/receiptionist";
import { toast } from "react-toastify";
import moment from "moment";

export default function ProfilePage() {

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState({
    addressOfArea: "",
    age : "",
    dob: "",
    emailAddress : "",
    firstName : "",
    lastName : "",
    phoneNumber : "",    
    userName : "",   
  });

  const [errors, setErrors] = useState({
    addressOfArea: "",
    age : "",
    dob: "",
    emailAddress : "",
    firstName : "",
    lastName : "",
    phoneNumber : "",    
    userName : "", 
  });

  const dispatch = useDispatch();
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
      id:id
    };
    setLoading(true);
    await dispatch(
      RECEPTIONIST_BY_ID(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        } else if(res.status){
          setData({
            addressOfArea: res.data.addressOfArea,
            age : res.data.age,
            dob: res.data.dob,
            emailAddress : res.data.emailAddress,
            firstName : res.data.firstName,
            lastName : res.data.lastName,
            phoneNumber : res.data.phoneNumber,    
            userName : res.data.userName, 
          });
        } else if (res?.response.status === 400) {
          toast.error("Id is required");
        }else{
          toast.error(res.message);
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
    }  else if (
      e.target.name === "age" && e.target.value < 18) {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "Age must be greate than 17" });
    } 
    else {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleUpdate = async() => {
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      id:id,
      payload:data
    };
    setLoading1(true);
    await dispatch(
      RECEPTIONIST_UPDATE(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        } else if(res.status === 200){
          toast.success("Information Updated");
          handleGetDataById()
        }
        else{
        toast.error(res?.message);
      }
        setLoading1(false);
      })
    );
  }

  if (loading) {
    return <LoaderFile />;
  }
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 100, md: 150 },
                maxWidth: { xs: 100, md: 150 },
                borderRadius: "15px",
                marginBottom: "15px",
              }}
              alt="The house from the offer."
              src="/assets/images/avatars/avatar_default.jpg"
            />

            <Typography variant="h6">{data.firstName.toUpperCase()} {data.lastName.toUpperCase()}</Typography>
            <Typography variant='subtitle2'> You can Updating your information easily !</Typography>
          </CardContent>

          <CardContent>
            <Typography variant="h5">Your Profile Information</Typography>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="string"
                      label="First Name"
                      name="firstName"
                      value={data.firstName}
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
                    {errors.firstName ? errors.firstName : ""}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="string"
                      label="Last Name"
                      name="lastName"
                      value={data.lastName}
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
                    {errors.lastName ? errors.lastName : ""}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="string"
                      label="User Name"
                      name="userName"
                      value={data.userName}
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
                    {errors.userName ? errors.userName : ""}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="string"
                      label="Email"
                      name="emailAddress"
                      value={data.emailAddress}
                      onChange={(e) => handleOnChange(e)}
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="string"
                      label="Contact"
                      name="phoneNumber"
                      value={data.phoneNumber}
                      onChange={(e) => handleOnChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                     <InputLabel className="error">
                    {errors.phoneNumber ? errors.phoneNumber : ""}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Age"
                      name="age"
                      value={data.age}
                      onChange={(e) => handleOnChange(e)}
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="string"
                      label="Address"
                      name="addressOfArea"
                      value={data.addressOfArea}
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
                    {errors.addressOfArea ? errors.addressOfArea : ""}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Date of Birth"
                      name="dob"
                      value={moment(data.dob).format('YYYY-MM-DD')}
                      onChange={(e) => handleOnChange(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                     <InputLabel className="error">
                    {errors.dob ? errors.dob : ""}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2, p: 2 }}
                  disabled={loading1 ? true :false}
                  onClick={handleUpdate}
                >
                   
                  Edit Your Details
                </Button>
              </Grid>
                </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
