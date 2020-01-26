import React, { Component } from "react";
import classes from "./Create.module.css";
import * as tf from "@tensorflow/tfjs";
import ModelHandler from "../ModelHandler";

class TensorVideo extends Component {
  constructor(props) {
    super(props);
    this.active = true;
    this.camera = this.camera.bind(this);
    this.webcam = null;
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
      if (this.props.classifier && this.props.classifier.getNumClasses() > 0) {
        const img = await this.webcam.capture();

        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, "conv_preds");
        // Get the most likely class and confidences from the classifier module.
        const result = await this.props.classifier.predictClass(activation);

        //classes[result.label] prediction
        //result.confidences[result.label]
        this.prediction = result.label;
        this.confidence = result.confidences[result.label];
        document.getElementById("prediction").innerText = `
          Prediction: ${result.label}\n
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

  render() {
    return (
      <div className={classes.Create}>
        <video
          className={classes.video}
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
      </div>
    );
  }
}

export default TensorVideo;
