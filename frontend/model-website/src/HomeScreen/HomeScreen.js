import React, { Component } from 'react';
import classes from './HomeScreen.module.css';
import BottomNav from '../BottomNav/BottomNav';
import { Link } from 'react-router-dom';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(e) {
        this.setState({
            search: e.target.value
        })
    }

    classDeterminer(collectionName) {
        collectionName = collectionName.toLowerCase();
        let classNames = classes.collection
        let searchTerm = this.state.search
        searchTerm = searchTerm.toLowerCase();
        if (this.state.search) {
            if (!collectionName.includes(searchTerm)) {
                classNames += " " + classes.hidden
                return classNames
            }
        }
        return classNames
    }

    render() {
        return (
            <div className={classes.HomeScreen}>
                <div className="ui search" style={{ "marginTop": "15px" }}>
                    <div className="ui icon input">
                        <input className="prompt" type="text" name="search" placeholder="Search" onChange={this.changeHandler} />
                        <i className="search icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
                <div className={classes.grid}>
                    <h1>Popular</h1>
                    <div className="ui grid">
                        <div className="row">
                            <div className="one wide column" />
                            <div className="seven wide column" >
                                <Link to="/moreinfo/shoes">
                                    <div className={this.classDeterminer("Shoes") + " " + classes.shoes}>
                                        <h3 style={{ "fontSize": "24px" }}>
                                            Shoes
                                        </h3>
                                        <img src="slipper.png" alt="slipper" style={{ "height": "300px", "marginLeft": "80px" }}></img>
                                    </div>
                                </Link>
                            </div>

                            <div className="seven wide column">
                                <Link to="/moreinfo/venice">
                                    <div className={this.classDeterminer("The City of Venice") + " " + classes.venice}>
                                        <h3 style={{ "fontSize": "24px" }}>
                                            The City of Venice
                                        </h3>
                                        <img src="eye-mask.png" alt="mask" style={{ "height": "240px", "marginLeft": "80px" }}></img>
                                    </div>
                                </Link>

                            </div>
                        </div>
                        <div className="row">
                            <div className="one wide column" />
                            <div className="seven wide column">
                                <Link to="/moreinfo/tamu">
                                <div className={this.classDeterminer("Texas A&M Campus Guide") + " " + classes.tamu}>
                                        <h3 style={{ "fontSize": "24px" }}>
                                            Texas A&M Campus Guide
                                        </h3>
                                        <img src="american-football.png" alt="football" style={{ "height": "300px", "marginLeft": "0px" }}></img>
                                    </div>
                                </Link>
                            </div>

                            <div className="seven wide column">
                                <Link to="/moreinfo/yellowstone">
                                <div className={this.classDeterminer("Yellowstone National Park Guide") + " " + classes.yellowstone}>
                                        <h3 style={{ "fontSize": "24px" }}>
                                            Yellowstone National Park Guide
                                        </h3>
                                        <img src="forest.png" alt="forest" style={{ "height": "250px", "marginLeft": "70px" }}></img>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <h3>Assisted</h3>
                    <div className="ui grid">
                        <div className="row">
                            <div className="one wide column" />
                            <div className="fourteen wide column">
                                <div style={{
                                    "background": "linear-gradient(180deg, rgba(143,211,255,1) 0%, rgba(195,232,255,1) 100%)",
                                    "width": "auto",
                                    "maxHeight": "400px",
                                    "color": "white",
                                    "borderRadius": "10px",
                                    "textAlign": "left",
                                    "padding": "10px",
                                    "mixBlendMode": "difference",
                                    "overflow": "hidden",
                                    "marginBottom": "75px",
                                    "boxShadow": "0px 6px 12px -1px rgba(49,49,49,0.62)"
                                }}
                                >
                                    <h3 style={{ "fontSize": "24px" }}>Visual Aid</h3>
                                    <img src="eye.png" alt="eye" style={{ "width": "auto" }}></img>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div style={{ "align": "center" }}>
                        <BottomNav />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeScreen;