import React from 'react';
import AppStpper  from '../../components/stepper';
import Grid from '@material-ui/core/Grid';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from '@mui/material/Button';
import ButtonComp from "../../components/ButtonComp";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Audio extends React.Component {
  intervalID = 0;
  state = {
    isRecording: false,
    blobURL: '',
    isBlocked: false,
    seconds: 0,
  }

  toHHMMSS = (secs) => {
    var date = new Date(0);
    date.setSeconds(secs); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  }

  componentDidMount(){
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
    const audio = localStorage.getItem('audio'); 
    if (audio) {
      this.setState({
        blobURL: JSON.parse(audio)
      })
    } 
  }

  startTimer = () => {
    this.intervalID = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1
      })
    }, 1000);
  }

  stopTimer = () => {
   clearInterval(this.intervalID)
  }
  
  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
          this.startTimer();
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
        this.stopTimer();
      }).catch((e) => console.log(e));
  };

  reset = () => {
    this.setState({ blobURL: '', isRecording: false, seconds: 0 })
  }

  render() {
    return(
      <div>
        <AppStpper activeStep={1}/>
        <Grid container>
          <Grid item xs={12} className='text-center'>
            <h2>Record Your Audio</h2>
          </Grid>
          {
            this.state.blobURL ?
            <Grid item xs={12}>
              <audio src={this.state.blobURL} controls="controls" />
            </Grid> : 
            <Grid item xs={12} className='text-center'>
              <h2>{this.toHHMMSS(this.state.seconds)}</h2>
            </Grid>
          }
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} className='text-right'>
                <Button onClick={this.start} disabled={this.state.isRecording && !this.state.blobURL}>
                  Record
                </Button>
              </Grid>
              <Grid item xs={4} className='text-center'>
                <Button onClick={this.stop} disabled={!this.state.isRecording}>
                  Stop
                </Button>
              </Grid>
              <Grid item xs={4} className='text-left'>
                <Button onClick={this.reset} disabled={!this.state.isRecording && !this.state.blobURL}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className='text-center'>
            <Grid container>
                <Grid item xs={6} className='text-right'>
                  <ButtonComp label={"Back"} url={'/basics'} data={this.state.blobURL} disabled={!this.state.isRecording && !this.state.blobURL}/>
                </Grid>
                <Grid item xs={6} className='text-left'>
                  <ButtonComp label={"Next"} url={'/password'} data={this.state.blobURL} disabled={!this.state.isRecording && !this.state.blobURL}/>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Audio;