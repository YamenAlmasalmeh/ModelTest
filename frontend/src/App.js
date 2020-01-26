import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

async function camera() {
  const webcamElement = document.getElementById("webcam");
  console.log("Loading mobilenet..");

  // Load the model.
  const net = await mobilenet.load();
  console.log("Successfully loaded model");

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);
  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById("console").innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      videoStream: null
    };

    this.getStream = this.getStream.bind(this);
  }

  componentDidMount() {
    this.getStream();
    camera();
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
            this.video = video
          }}
          autoplay
          playsinline
          muted
          id="webcam"
          width="224"
          height="224"
        ></video>
        <div id="console"></div>
      </div>
    );
  }
}

export default App;
