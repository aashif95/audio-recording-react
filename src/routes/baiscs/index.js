import React from 'react';
import AppStpper  from '../../components/stepper';
import BasicsForm  from '../../components/BasicsForm';
import { Grid } from '@material-ui/core'
class Basics extends React.Component {

  state = {
    formBasicDetails: null
  }
  componentDidMount () {
    this.loadFormBasicDetails()
  }

  loadFormBasicDetails(){   
    let data = localStorage.getItem('formBasicDetails')
    if (data) {
      this.setState({
        formBasicDetails: JSON.parse(data)
      })
    }
  }

  render() {
    return(
      <div>
        <AppStpper activeStep={0}/>
        <div className='w-100 text-center'>
           <h2>{'Basics'}</h2>
         </div>
        <Grid container alignItems='center' direction='column'>
          <Grid lg={6} md={8} sm={12}>
            <BasicsForm 
              formBasicDetails={this.state.formBasicDetails}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Basics;