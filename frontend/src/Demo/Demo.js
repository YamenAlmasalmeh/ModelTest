import React, { Component } from "react";
import classes from "./Demo.module.css";
import BottomNav from "../BottomNav/BottomNav";
import { Swipeable } from "react-swipeable";
import ModelHandler from "../ModelHandler";
import TensorVideo from "../TensorVideo";

let subscriptionKey = "a81d3e6d76a44b9cbd3dea424abefc80";
let host = "api.cognitive.microsoft.com";
let path = "/bing/v7.0/images/search";
let imgs = [];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.swipeUpHandler = this.swipeUpHandler.bind(this);
    this.swipeDownHandler = this.swipeDownHandler.bind(this);
    this.tensorVideo = React.createRef();
  }

  swipeUpHandler() {
    console.log(this.tensorVideo.current.prediction)
    if (!this.tensorVideo.current.prediction) {
      return;
    }
    let term = this.tensorVideo.current.prediction;
    const fetchOptions = {
      method: "get",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };
    fetch(
      "https://" + host + path + "?q=" + encodeURIComponent(term),
      fetchOptions
    )
      .then(res => res.json())
      .then(res => {
        [...new Array(6).keys()].map((v, i) => {
          return imgs.push(res.value[i].contentUrl);
        });
      });
    this.setState({ open: true });
  }

  swipeDownHandler() {
    this.setState({ open: false });
  }

  render() {
    let drawerClass = null;
    let chevron = null;

    if (this.state.open) {
      drawerClass = classes.googleResultsSwiped;
      chevron = <i className="fas fa-chevron-down"></i>;
    } else {
      drawerClass = classes.googleResults;
      chevron = <i className="fas fa-chevron-up"></i>;
    }

    return (
      <div className={classes.Demo}>
        <TensorVideo
          classifier={this.props.content.name && ModelHandler.getClassifier(this.props.content.name)}
          ref={this.tensorVideo}
        ></TensorVideo>
        <div className={this.state.open ? classes.onSwipe : null}>
          <i className={"fas fa-check " + classes.correct}></i>
          <i className={"fas fa-times " + classes.incorrect}></i>
        </div>
        <Swipeable
          onSwipedUp={this.swipeUpHandler}
          onSwipedDown={this.swipeDownHandler}
        >
          <div className={drawerClass}>
            {chevron}
            <h2>Bing Image Results</h2>
            <div className={"container " + classes.container}>
              <div className={"ui grid " + classes.results}>
                <div className="row">
                  <div className="sixteen wide column">
                    <div className={"card " + classes.card}>
                      <div className="image">
                        {imgs[0] ? (
                          <img src={imgs[0]} alt="comparison 1" />
                        ) : (
                          <div className={classes.spinner}>
                            <i className="fas fa-spinner fa-pulse"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="sixteen wide column">
                    <div className={"card " + classes.card}>
                      <div className="image">
                        {imgs[1] ? (
                          <img src={imgs[1]} alt="comparison 1" />
                        ) : (
                          <div className={classes.spinner}>
                            <i className="fas fa-spinner fa-pulse"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="sixteen wide column">
                    <div className={"card " + classes.card}>
                      <div className="image">
                        {imgs[2] ? (
                          <img src={imgs[2]} alt="comparison 1" />
                        ) : (
                          <div className={classes.spinner}>
                            <i className="fas fa-spinner fa-pulse"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="sixteen wide column">
                    <div className={"card " + classes.card}>
                      <div className="image">
                        {imgs[3] ? (
                          <img src={imgs[3]} alt="comparison 1" />
                        ) : (
                          <div className={classes.spinner}>
                            <i className="fas fa-spinner fa-pulse"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="sixteen wide column">
                    <div className={"card " + classes.card}>
                      <div className="image">
                        {imgs[4] ? (
                          <img src={imgs[4]} alt="comparison 1" />
                        ) : (
                          <div className={classes.spinner}>
                            <i className="fas fa-spinner fa-pulse"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="sixteen wide column">
                    <div className={"card " + classes.card}>
                      <div className="image">
                        {imgs[5] ? (
                          <img src={imgs[5]} alt="comparison 1" />
                        ) : (
                          <div className={classes.spinner}>
                            <i className="fas fa-spinner fa-pulse"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Swipeable>
        <BottomNav />
        <script src="index.js"></script>
      </div>
    );
  }
}

export default Demo;
