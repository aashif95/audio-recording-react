import React from 'react';
import AppStpper  from '../../components/stepper';
import PasswordForm  from '../../components/PasswordForm';
import { Grid } from '@material-ui/core'

class Password extends React.Component {

  state = {
    passwordData: null
  }
  componentDidMount () {
    this.loadFormPasswordDetails()
  }

  loadFormPasswordDetails(){   
    let data = localStorage.getItem('password')
    if (data) {
      this.setState({
        passwordData: JSON.parse(data)
      })
    }
  }

  render() {
    return(
      <div>
        <AppStpper activeStep={2}/>
          <div className='w-100 text-center'>
           <h2>{'Create Password'}</h2>
         </div>
         <Grid container alignItems='center' direction='column'>
            <Grid lg={6} md={8} sm={12}>
              <PasswordForm passwordData={this.state.passwordData}/>
            </Grid>
          </Grid>
      </div>
    )
  }
}

export default Password;