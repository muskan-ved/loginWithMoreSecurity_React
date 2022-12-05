import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HomeIcon from "@mui/icons-material/Home";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderFile } from "src/common/loader";
import { useDispatch, useSelector } from "react-redux";
import { VISITOR_LIST_BY_ID, VISITOR_UPDATE } from "src/actions/visitor";
import { RECEPTION_LOGOUT } from "src/actions/auth";
import { toast } from "react-toastify";
import { FRONT_END_BASE_URL } from "src/config/config";
import emailjs from '@emailjs/browser';

const UserDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const ReduxStore = useSelector((state) => state);
  
  const dispatch = useDispatch();

  const [data, setData] = useState({
    Name: "",
    age: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    purposeToVisit: "",
    status: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
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
        } else if (res?.message) {
          toast.error(res?.message);
        } else if (res.status === 200) {
          setData({
            Name: res.data.Name,
            age: res.data.age,
            emailAddress: res.data.emailAddress,
            phoneNumber: res.data.phoneNumber,
            address: res.data.address,
            purposeToVisit: res.data.purposeToVisit,
            status: res.data.status,
          });
        }
        setLoading(false);
      })
    );
  };


  const handleClickOpen = async (identifier) => {
    if (identifier === "edit") {
      navigate(`/dashboard/edit/${id}`);
    } else if (identifier === "QR") {
      setLoading2(true)
        var templateParams = {
        too:'muskan.ved@mangoitsolutions.in',
        reply_to:'muskan.mangoit@gmail.com',
        to_name: `${data.Name}`,
        message: `<a href='http://api.qrserver.com/v1/create-qr-code/?data=${FRONT_END_BASE_URL}/dashboard/yourDetail/${id}!&size=${200}x${200}' style='color: white;background-color: #2065d1;padding: 6px;border-radius: 15px;text-decoration: none'>CLICK ME</a>`,
        
      };
      emailjs.send('service_yydhppi', 'template_skq6bgb', templateParams,'ukquTCE2qR4B-NeoR')
        .then(function(response) {
          toast.success('QR sended to your mail');
          setLoading2(false)
        }, function(error) {
          toast.success('FAILED...');
          setLoading2(false)

        });
    } else {
      let date = new Date();
      var requestData;
      if (identifier === "checkin") {
        requestData = {
          headerAuthToken: ReduxStore.auth.auth_token,
          headerLoginToken: ReduxStore.auth.login_token,
          id: id,
          payload: { ...data, status: identifier, checkInTime: date },
        };
      } else {
        requestData = {
          headerAuthToken: ReduxStore.auth.auth_token,
          headerLoginToken: ReduxStore.auth.login_token,
          id: id,
          payload: { ...data, status: identifier, checkOutTime: date },
        };
      }
      setLoading1(true);
      await dispatch(
        VISITOR_UPDATE(requestData, (res) => {
          if (res?.response?.status === 401) {
            RECEPTION_LOGOUT();
          } else if (res.status === 200) {
            toast.success(`Your status '${identifier}'`);
            handleGetDataById();
          } else if (res?.response?.data.message) {
            toast.error(res?.response?.data.message);
          } else {
            toast.error(res.message);
          }
          setLoading1(false);
        })
      );
    }
  };

  if (loading) {
    return <LoaderFile />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
             
              <Typography variant="h4" marginBottom={"6px"}>
                Profile Information |{" "}
                <Chip
                  label={
                    data.status !== "none"
                      ? data.status.toUpperCase()
                      : "PENDING"
                  }
                  variant="outlined"
                  color={
                    data.status === "checkin"
                      ? "success"
                      : data.status === "checkout"
                      ? "error"
                      : "warning"
                  }
                />
              </Typography>
              <Divider sx={{ mb: 4 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="string"
                    label="Your Name"
                    name="Name"
                    defaultValue={data.Name}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Age"
                    name="Age"
                    defaultValue={data.age}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermContactCalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="string"
                    label="Email"
                    name="Email"
                    defaultValue={data.emailAddress}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="string"
                    label="Contact"
                    name="Contact"
                    defaultValue={data.phoneNumber}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="string"
                    label="Address"
                    name="Address"
                    defaultValue={data.address}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="string"
                    label="Purpose To Visit"
                    name="Purpose To Visit"
                    defaultValue={data.purposeToVisit}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <StarBorderPurple500Icon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" marginBottom={"3px"}>
                Generate QR Code
              </Typography>
              <Divider sx={{ mb: 4 }} />
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant="span">
                    To generate QR code, Click GET CODE button
                  </Typography>
                  {loading2 !== true ? <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => handleClickOpen("QR")}
                    disabled={loading2 ? true : false}
                    sx={{ mt: 3 }}
                  >
                    GET CODE
                  </Button>:<LoaderFile/>}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" marginBottom={"3px"}>
                Edit your detail
              </Typography>
              <Divider sx={{ mb: 4 }} />
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant="span">
                    To edit your personalization...
                  </Typography>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => handleClickOpen("edit")}
                    sx={{ mt: 3 }}
                  >
                    EDIT
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            {data.status === "checkin" ? (
              <CardContent>
                <Typography variant="h4" marginBottom={"3px"}>
                  Check Out
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="span">
                      For Checkout, Click CHECKOUT button
                    </Typography>
                    {loading1 !== true ?  <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={() => handleClickOpen("checkout")}
                      sx={{ mt: 3 }}
                    >
                      CHECK OUT
                    </Button>:<LoaderFile/>}
                  </Grid>
                </Grid>
              </CardContent>
            ) : (
              <CardContent>
                <Typography variant="h4" marginBottom={"3px"}>
                  Check In
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant="span">
                      For Checkin, Click CHECKIN button
                    </Typography>
                    {loading1 !== true ? <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={() => handleClickOpen("checkin")}
                      sx={{ mt: 3 }}
                    >
                      CHECK IN
                    </Button>:<LoaderFile/>}
                  </Grid>
                </Grid>
              </CardContent>
            )}
          </Card>
        </Grid>      
      </Grid>
    </>
  );
};

export default UserDetailPage;
