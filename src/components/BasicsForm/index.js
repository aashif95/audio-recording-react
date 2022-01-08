import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  name: yup
  .string('Enter your name')
  .required('name is required'),
  phone: yup
  .number('Enter your email')
  .positive('Invalid Phone number')
  .integer('Invalid phone number')
  .required('Phone number required'),
});


const BasicForm = ({formBasicDetails}) => {

  const naviagte = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: formBasicDetails?.email || '',
      name: formBasicDetails?.name || '',
      phone: formBasicDetails?.phone || ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('formBasicDetails', JSON.stringify(values));
      naviagte('/audio')
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
          <Grid item xs={12} className='mb-1'>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} className='mb-1'>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
          </Grid>
          <Grid item xs={12} className='mb-1'>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid> 
          <Grid item xs={12} className='text-center'>
            <Button  type="submit">
              Submit
            </Button>
          </Grid>
      </Grid>
    </form>
  );
};


export default BasicForm;