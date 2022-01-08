import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonComp from "../../components/ButtonComp";

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Confirm password is required')
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});


const PasswordForm = ({passwordData}) => {
  const naviagte = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: passwordData?.password,
      confirmPassword: passwordData?.confirmPassword,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('password', JSON.stringify(values));
      naviagte('/terms')
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
          <Grid item xs={12} className='mb-1'>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="password"
              type={'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
          </Grid>
          <Grid item xs={12} className='mb-1'>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              type={'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6} className='text-right'>
                  <ButtonComp label={'Back'} url={'/audio'} />
              </Grid>
              <Grid item xs={6} className='text-left'>      
                <Button color="primary"   type="submit">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
    
      </Grid>
    </form>
  );
};


export default PasswordForm;