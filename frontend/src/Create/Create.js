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
import Coll from "../Collections/Collections"

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classifierName: "",
      held: false,
      allModels: [],
      nameBox: false
    };
    this.active = true;
    this.fillButton = this.fillButton.bind(this);
    this.unfillButton = this.unfillButton.bind(this);
    this.publishClickHandler = this.publishClickHandler.bind(this);
    this.classifier = knnClassifier.create();
    this.autocomplete = React.createRef();
    this.tensorVideo = React.createRef();
    this.webcam = null;
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

  publishClickHandler() {
    ModelHandler.createClassifier(this.state.classifierName, this.classifier);
    Coll.getCollections()[3].rendered = 1;
  }

  render() {
    return (
      <div className={classes.Create}>
        <TensorVideo
          classifier={this.classifier}
          ref={this.tensorVideo}
        ></TensorVideo>
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
              label="Model Name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onChange={ev => this.setState({ classifierName: ev.target.value })}
        >
          <TextField
            id="outlined-basic"
            label="Collection Name"
            variant="outlined"
          />
        </form>
        <div>
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
          <i
            className={"fas fa-plus " + classes.correct}
            onClick={this.publishClickHandler}
          ></i>
        </div>

        <BottomNav />
        <script src="index.js"></script>
      </div>
    );
  }
}

export default Create;
