import * as React from 'react';
import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { LoginParamsType } from '../../api/auth-api';
import { localStorageActions } from '../../shared/localStorageActions';
import ShowPasswords from '../../shared/show-password/show-password';
import { loginStore } from '../../stores';

import '../../shared/show-password/show-password.css';

export const Login = observer((): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginParamsType>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginParamsType> = data => {
    if (data) {
      loginStore.loginUser(data);
      localStorageActions.setLoginData(data.email);
    }
    if (loginStore.login.errorEmail !== undefined) {
      reset({
        email: '',
        password: '',
      });
    }
  };

  const typeShowInput = (
    type: 'email' | 'password' | 'text',
  ): 'email' | 'password' | 'text' => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  if (loginStore.login.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormGroup>
              <TextField
                {...register('email', {
                  required: 'please enter your email',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: 'please enter your email correctly',
                  },
                })}
                placeholder="enter your email"
                title="email"
                type="email"
              />
              <span className="errorEmailPasswordMessage">{errors.email?.message}</span>
              <TextField
                {...register('password', {
                  required: 'please enter your password',
                  pattern: {
                    value: /[0-9a-zA-Z!@#$%^&*]{8,}/,
                    message: 'please enter your password correctly',
                  },
                })}
                placeholder="enter_your_password"
                title="password"
                type={typeShowInput('password')}
              />
              <span className="errorEmailPasswordMessage">
                {errors.password?.message}
              </span>
              <ShowPasswords
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <FormControlLabel
                label="Remember me"
                control={<Checkbox {...register('rememberMe', {})} title="rememberMe" />}
              />
              <LoadingButton
                color="secondary"
                variant="contained"
                type="submit"
                disabled={!isDirty || !isValid}
                loading={loginStore.login.isLoginLoading === 'pending'}
                title="login"
              >
                <span>Login</span>
              </LoadingButton>
              <span className="errorMessage">{loginStore.login.errorEmail}</span>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
});
