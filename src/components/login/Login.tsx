import * as React from 'react';
import { useState } from 'react';

import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { localStorageActions } from '../../shared/localStorageActions';
import ShowPasswords from '../../shared/show-password/show-password';
import { loginStore } from '../../stores';

import '../../shared/show-password/show-password.css';

export interface ILoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ILoginData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginData> = data => {
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
    type: 'name' | 'login' | 'password' | 'text',
  ): 'name' | 'login' | 'password' | 'text' => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', {
          required: 'please enter your email',
          pattern: {
            value: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i,
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
      <span className="errorEmailPasswordMessage">{errors.password?.message}</span>
      <ShowPasswords showPassword={showPassword} setShowPassword={setShowPassword} />
      {/* <Button
        type="submit"
        disabled={!isDirty || !isValid}
        // loadingStatus={loginRequestStatus}
        title="login"
        variant="contained"
        color="primary"
      /> */}
      <LoadingButton
        color="secondary"
        startIcon={<SaveIcon />}
        variant="contained"
        type="submit"
        disabled={!isDirty || !isValid}
        loading={loginStore.login.loginRequestStatus === 'pending'}
        title="login"
      >
        <span>Save</span>
      </LoadingButton>
      <span className="errorMessage">{loginStore.login.errorEmail}</span>
    </form>

    /*    <Grid item style={{ margin: '0 auto' }}>
      <FormControl>
        <FormGroup>
          <TextField label="Email" margin="normal" type="email" />
          <TextField label="Password" margin="normal" type="password" />
          <FormControlLabel
            label="Remember me"
            control={<Checkbox name="rememberMe" />}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormGroup>
      </FormControl>
    </Grid> */
  );
};
