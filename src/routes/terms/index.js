import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AppStpper  from '../../components/stepper';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import ButtonComp from "../../components/ButtonComp";

class Terms extends React.Component {
  state = {
    termsAndCondtion: false
  }

  finishForm = () => {
    const basicData = localStorage.getItem('formBasicDetails');
    const audioData = localStorage.getItem('audio');
    const password = localStorage.getItem('password');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: basicData.name, email: basicData.email, 
        phone: basicData.phone, audio: audioData, password: password.password, 
        confirmPassword: password.confirmPassword})
  };
  fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Form Submited')
      });
  }

  render() {
    return(
      <div>
         <AppStpper activeStep={3}/>
         <div className='w-100 text-center'>
           <h2>{'Terms & Condtion'}</h2>
         </div>
         <div className='p-5'>
          <FormControlLabel control={<Checkbox checked={this.state.termsAndCondtion} onClick={() => {
            this.setState({termsAndCondtion: !this.state.termsAndCondtion})
          }} />} label="I here by accept all the terms and conditions" />
         </div>
         <Grid item xs={12} className='text-center'>
            <Grid container>
                <Grid item xs={6} className='text-right'>
                  <ButtonComp label={"Back"} url={'/password'}/>
                </Grid>
                <Grid item xs={6} className='text-left'>
                  <Button onClick={this.finishForm} disabled={!this.state.termsAndCondtion}>
                    Finish
                  </Button>
                </Grid>
            </Grid>
          </Grid>
      </div>
    )
  }
}

export default Terms;