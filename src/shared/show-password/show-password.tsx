import React from 'react';

import { NO_VIEW, VIEW } from '../../constants/constants';

import './show-password.css';

type TShowPassword = {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};

const ShowPasswords = (props: TShowPassword): React.ReactElement => {
  const { showPassword, setShowPassword } = props;
  return (
    <img
      alt="your password"
      src={showPassword ? NO_VIEW : VIEW}
      className="passwordControl"
      onClick={() => {
        setShowPassword(!showPassword);
      }}
      role="presentation"
    />
  );
};

export default ShowPasswords;
