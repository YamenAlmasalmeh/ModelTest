import React, { Component } from "react";
import classes from "./Create.module.css";
import BottomNav from "../BottomNav/BottomNav";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import ModelHandler from "../ModelHandler";
import TensorVideo from "../TensorVideo";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      held: false,
      allModels: []
    };
    this.active = true;
    this.fillButton = this.fillButton.bind(this);
    this.unfillButton = this.unfillButton.bind(this);
    this.classifier = knnClassifier.create();
    this.autocomplete = React.createRef();
    this.tensorVideo = React.createRef();
    this.webcam = null;
  }

  publish(name) {
    ModelHandler.createClassifier(name, this.classifier);
  }

  onPictureClick() {
    //check if combo box value exists in list
    const classifierName = "test";

    if (!this.state.allModels.includes(classifierName)) {
      this.setState(prev => {
        const allModels = [...prev.allModels, classifierName];
        return {
          allModels
        };
      });
    }

    ModelHandler.trainClassification(
      this.tensorVideo.current.webcam,
      this.classifier,
      classifierName
    );
  }

  fillButton() {
    this.setState({ held: true });
  }

  unfillButton() {
    this.setState({ held: false });
  }

  render() {
    return (
      <div className={classes.Create}>
        <TensorVideo classifier={this.classifier} ref={this.tensorVideo}></TensorVideo>
        <Autocomplete
          ref={this.autocomplete}
          className={classes.box}
          id="combo-box"
          options={this.state.allModels}
          getOptionLabel={option => option}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <i
          onClick={() => this.onPictureClick()}
          className={
            this.state.held
              ? "fas fa-camera-retro " +
                classes.camera +
                " " +
                classes.cameraFilled
              : "fas fa-camera-retro " + classes.camera
          }
          onMouseDown={this.fillButton}
          onMouseUp={this.unfillButton}
        ></i>
        <BottomNav />
        <script src="index.js"></script>
      </div>
    );
  }
}

export default Create;
