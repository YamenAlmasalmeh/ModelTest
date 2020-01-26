import React, { Component } from "react";
import classes from "./Create.module.css";
import BottomNav from "../BottomNav/BottomNav";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import ModelHandler from "../ModelHandler";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      held: false,
      allModels: ["test", "testestset", "a"]
    };
    this.active = true;
    this.fillButton = this.fillButton.bind(this);
    this.unfillButton = this.unfillButton.bind(this);
    this.camera = this.camera.bind(this);
    this.classifier = knnClassifier.create();
    this.autocomplete = React.createRef();
  }

  componentDidMount() {
    this.camera();
  }

  componentWillUnmount() {
    this.active = false;
  }

  async camera() {
    const webcamElement = document.getElementById("webcam");

    // Load the model.
    const net = await ModelHandler.getNet();

    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.
    this.webcam = await tf.data.webcam(webcamElement, {
      facingMode: "environment"
    });

    while (this.active) {
      if (this.classifier.getNumClasses() > 0) {
        const img = await this.webcam.capture();

        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, "conv_preds");
        // Get the most likely class and confidences from the classifier module.
        const result = await this.classifier.predictClass(activation);

        //classes[result.label] prediction
        //result.confidences[result.label]
        document.getElementById("prediction").innerText = `
          Prediction: ${classes[result.label]}\n
        `;

        document.getElementById("confidence").innerText = `
          probability: ${result.confidences[result.label]}
        `;

        // Dispose the tensor to release the memory.
        img.dispose();
      }

      await tf.nextFrame();
    }
  }

  publish(name) {}

  onPictureClick() {
    //check if combo box value exists in list
    console.log(this.autocomplete);
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
        <video
          ref={video => {
            this.video = video;
          }}
          autoPlay
          playsInline
          muted
          id="webcam"
          width="224"
          height="224"
        ></video>
        <h1 id="prediction">Prediction:</h1>
        <h3 id="confidence">Confidence:</h3>
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
