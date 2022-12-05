import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useFormInputValidation } from "react-form-input-validation";
// ** Redux Import
import { useDispatch, useSelector } from 'react-redux';
import { LoaderFile } from "src/common/loader";
import { RECEPTION_LOGIN } from "src/actions/auth";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth_token = useSelector(state => state.auth.auth_token)

  const register_redux_email = useSelector(state => state?.register?.data?.payload?.newUser?.emailAddress)

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const [fields, errors, form] = useFormInputValidation(
    {
      userName:register_redux_email,
      password: "",
    },
    {
      userName: "required",
      password: "required",
    }
  );
  
  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    const requestData = {
      payload: fields,
      header: auth_token
    }
    if (isValid) {
      setLoading(true);
      await dispatch(
        RECEPTION_LOGIN(requestData, (res) => {
          if(res?.response?.data?.message){
            toast.error(res?.response?.data?.message)
          }else if(res.status === 200){
            toast.success("Receiption Logged In")
            navigate("/dashboard", { replace: true });
          }else{
            toast.error('User not verify')
          }
        }))
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="myForm"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Stack spacing={2}>
          <TextField
            name="userName"
            label="Email address"
            onChange={form.handleChangeEvent}
            onBlur={form.handleBlurEvent}
            defaultValue={register_redux_email}
          />
          <InputLabel className="error">
            {errors.userName ? errors.userName : ""}
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
            {errors.password ? errors.password : ""}
          </InputLabel>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
        </Stack>
        {!loading ? (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={onSubmit}
            disabled={errors === null || isEmpty(errors) ? false : true}
          >
            Login
          </LoadingButton>
        ) : (
          <LoaderFile />)}
      </form>
    </>
  );
}
