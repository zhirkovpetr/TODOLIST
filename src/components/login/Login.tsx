import * as React from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';

export const Login = (): React.ReactElement => (
  <Grid item style={{ margin: '0 auto' }}>
    <FormControl>
      <FormGroup>
        <TextField label="Email" margin="normal" type="email" />
        <TextField label="Password" margin="normal" type="password" />
        <FormControlLabel label="Remember me" control={<Checkbox name="rememberMe" />} />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </FormGroup>
    </FormControl>
  </Grid>
);
