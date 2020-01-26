import React, { Component } from 'react';
import classes from './Create.module.css';
import BottomNav from '../BottomNav/BottomNav';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            held: false,
            allModels: []
        };
        this.fillButton = this.fillButton.bind(this);
        this.unfillButton = this.unfillButton.bind(this);
    }

    fillButton(){
        this.setState({held: true})
    }

    unfillButton(){
        this.setState({held: false})
    }

    render() {

        return (
            <div className={classes.Create}>
                <video className={classes.video} autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                <div id="console"></div>
                <h1>Prediction: {this.state.prediction}</h1>
                <h3>Confidence:</h3>
                <Autocomplete
                    className={classes.box}
                    id="combo-box"
                    options={this.state.allModels}
                    getOptionLabel={option => option}
                    style={{ width: 300 }}
                    renderInput={params => (
                        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
                    )}
                />
                <i className={this.state.held 
                    ? "fas fa-camera-retro " + classes.camera + " " + classes.cameraFilled
                    : "fas fa-camera-retro " + classes.camera } onMouseDown={this.fillButton} onMouseUp={this.unfillButton}></i>
                <BottomNav />
                <script src="index.js"></script>
            </div>
        );
    }
}

export default Create;