import React, { Component } from 'react';
import classes from './Demo.module.css';
import BottomNav from '../BottomNav/BottomNav';
import { Swipeable } from 'react-swipeable';

let subscriptionKey = 'a81d3e6d76a44b9cbd3dea424abefc80';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';
let imgs = []

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            prediction: "grass",
        };
        this.swipeUpHandler = this.swipeUpHandler.bind(this);
        this.swipeDownHandler = this.swipeDownHandler.bind(this);
    }

    swipeUpHandler() {
        this.setState({ open: true })
    }

    swipeDownHandler() {
        this.setState({ open: false })
    }

    componentDidMount() {
        if (this.state.prediction) {
            let term = this.state.prediction;
            const fetchOptions = {
                method: 'get',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                }
            }
            fetch("https://" + host + path + '?q=' + encodeURIComponent(term), fetchOptions)
                .then(res => res.json())
                .then(res => {
                    [...new Array(6).keys()].map((v, i) => {
                        return imgs.push(res.value[i].contentUrl)
                    }
                    )
                })
        }
    }

    render() {

        let drawerClass = null
        let chevron = null

        if (this.state.open) {
            drawerClass = classes.googleResultsSwiped
            chevron = <i className="fas fa-chevron-down"></i>

        }

        else {
            drawerClass = classes.googleResults
            chevron = <i className="fas fa-chevron-up"></i>
        }


        return (
            <div className={classes.Demo}>
                <video className={classes.video} autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                <div id="console"></div>
                <h1>Prediction: {this.state.prediction}</h1>
                <div className={this.state.open ? classes.onSwipe : null}>
                    <i className={"fas fa-check " + classes.correct}></i>
                    <i className={"fas fa-times " + classes.incorrect}></i>
                </div>
                <Swipeable onSwipedUp={this.swipeUpHandler} onSwipedDown={this.swipeDownHandler}>
                    <div className={drawerClass}>
                        {chevron}
                        <h2>Bing Image Results</h2>
                        <div className={"container "+ classes.container}>
                            <div className={"ui grid " + classes.results}>
                                <div className="row">
                                    <div className="sixteen wide column" >
                                        <div className={"card " + classes.card}>
                                            <div className="image">
                                                {imgs[0] ? <img src={imgs[0]} alt="comparison 1" /> : <div className={classes.spinner}><i className="fas fa-spinner fa-pulse"></i></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="sixteen wide column" >
                                        <div className={"card " + classes.card}>
                                            <div className="image">
                                                {imgs[1] ? <img src={imgs[1]} alt="comparison 1" /> : <div className={classes.spinner}><i className="fas fa-spinner fa-pulse"></i></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="sixteen wide column" >
                                        <div className={"card " + classes.card}>
                                            <div className="image">
                                                {imgs[2] ? <img src={imgs[2]} alt="comparison 1" /> : <div className={classes.spinner}><i className="fas fa-spinner fa-pulse"></i></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="sixteen wide column" >
                                        <div className={"card " + classes.card}>
                                            <div className="image">
                                                {imgs[3] ? <img src={imgs[3]} alt="comparison 1" /> : <div className={classes.spinner}><i className="fas fa-spinner fa-pulse"></i></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="sixteen wide column" >
                                        <div className={"card " + classes.card}>
                                            <div className="image">
                                                {imgs[4] ? <img src={imgs[4]} alt="comparison 1" /> : <div className={classes.spinner}><i className="fas fa-spinner fa-pulse"></i></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="sixteen wide column" >
                                        <div className={"card " + classes.card}>
                                            <div className="image">
                                                {imgs[5] ? <img src={imgs[5]} alt="comparison 1" /> : <div className={classes.spinner}><i className="fas fa-spinner fa-pulse"></i></div>}
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