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
import Coll from "../Collections/Collections";
import { Link } from 'react-router-dom'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classifierName: "",
      currentClass: "",
      allModels: [],
      nameBox: false
    };
    this.active = true;
    this.publishClickHandler = this.publishClickHandler.bind(this);
    this.classifier = knnClassifier.create();
    this.autocomplete = React.createRef();
    this.tensorVideo = React.createRef();
    this.webcam = null;
  }

  onPictureClick() {
    //check if combo box value exists in list
    const classifierName = this.state.currentClass;

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

  publishClickHandler() {
    ModelHandler.createClassifier(this.state.classifierName, this.classifier);

    Coll.getCollections().forEach((element, index) => {
      if(element.name === this.state.classifierName){
        Coll.getCollections()[index].rendered = 1;
        return;
      }
    })

    Coll.getCollections().push({
      name: this.state.classifierName,
      url: Math.floor(Math.random() * 100),
      img: "museum.png",
      rendered: 1
    })
  }

  render() {
    return (
      <div className={classes.Create}>
        <TensorVideo
          classifier={this.classifier}
          ref={this.tensorVideo}
        ></TensorVideo>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onChange={ev => this.setState({ currentClass: ev.target.value })}
        >
          <TextField id="outlined-basic" label="Item Name" variant="outlined" />
        </form>
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
            className={"fas fa-camera-retro " +
                  classes.camera}
          ></i>
          <Link to="/">
          <i
            className={"fas fa-plus " + classes.correct}
            onClick={this.publishClickHandler}
          ></i>
          </Link>
        </div>

        <BottomNav />
        <script src="index.js"></script>
      </div>
    );
  }
}

export default Create;
