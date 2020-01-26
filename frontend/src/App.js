import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      classifiers: ["class A", "class B", "class C", "class D"]
    };
    this.getStream = this.getStream.bind(this);
    this.camera = this.camera.bind(this);
    this.net = null;
    this.classifier = knnClassifier.create();
  }

  componentDidMount() {
    this.getStream();
    this.camera();
  }

  async camera() {
    const webcamElement = document.getElementById("webcam");

    // Load the model.
    this.net = await mobilenet.load();

    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.
    this.webcam = await tf.data.webcam(webcamElement);
    while (true) {
      if (this.classifier.getNumClasses() > 0) {
        const img = await this.webcam.capture();

        // Get the activation from mobilenet from the webcam.
        const activation = this.net.infer(img, "conv_preds");
        // Get the most likely class and confidences from the classifier module.
        const result = await this.classifier.predictClass(activation);

        const classes = this.state.classifiers;
        document.getElementById("console").innerText = `
          prediction: ${classes[result.label]}\n
          probability: ${result.confidences[result.label]}
        `;

        // Dispose the tensor to release the memory.
        img.dispose();
      }

      await tf.nextFrame();
    }
  }

  async trainClassification(classId) {
    if (!this.net || !this.webcam) {
      return;
    }

    const webcamElement = document.getElementById("webcam");

    // Capture an image from the web camera.
    const img = await this.webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = this.net.infer(img, "conv_preds");

    // Pass the intermediate activation to the classifier.
    this.classifier.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  }

  async getStream() {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }

    const devices = await navigator.mediaDevices.enumerateDevices();

    for (let device of devices) {
      if (device.kind === "videoinput" && device.label.includes("back")) {
        const videoSource = device.deviceId;
        const constraints = {
          video: {
            deviceId: videoSource ? { exact: videoSource } : undefined
          }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.video.srcObject = stream;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <video
          ref={video => {
            this.video = video;
          }}
          autoplay
          playsinline
          muted
          id="webcam"
          width="224"
          height="224"
        ></video>
        {this.state.classifiers.map((classifier, index) => {
          return (
            <button
              id={classifier}
              onClick={() => this.trainClassification(index)}
            >
              {classifier}
            </button>
          );
        })}
        <div id="console"></div>
      </div>
    );
  }
}

export default App;
