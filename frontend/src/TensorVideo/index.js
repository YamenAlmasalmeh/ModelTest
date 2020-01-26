import React, { Component } from "react";
import classes from "./Create.module.css";
import * as tf from "@tensorflow/tfjs";
import ModelHandler from "../ModelHandler";

class TensorVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: "N/A",
      confidence: "N/A"
    };
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
      if (this.props.classifier === "default") {
        const img = await this.webcam.capture();
        const result = await net.classify(img);
        this.prediction = result[0].className
        this.confidence = result[0].probability
        this.setState({
          prediction: this.prediction,
          confidence: Math.round(this.confidence * 100) / 100
        });
        
        // Dispose the tensor to release the memory.
        img.dispose();

        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
      } else if (
        this.props.classifier &&
        this.props.classifier.getNumClasses() > 0
      ) {
        const img = await this.webcam.capture();

        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, "conv_preds");
        // Get the most likely class and confidences from the classifier module.
        const result = await this.props.classifier.predictClass(activation);

        //classes[result.label] prediction
        //result.confidences[result.label]
        this.prediction = result.label;
        this.confidence = result.confidences[result.label];
        this.setState({
          prediction: this.prediction,
          confidence: Math.round(this.confidence * 100) / 100
        });

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
        <h1 id="prediction">
          Prediction: {this.state.prediction} || Confidence:{" "}
          {this.state.confidence}
        </h1>
      </div>
    );
  }
}

export default TensorVideo;
