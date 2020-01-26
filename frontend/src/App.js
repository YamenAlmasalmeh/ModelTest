import React from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Webcam></Webcam>
        <div id="console"></div>
      </div>
    );
  }
}

export default App;
