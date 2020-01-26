import React, { Component } from 'react';
import classes from './HomeScreen.module.css';
import BottomNav from '../BottomNav/BottomNav';
import { Link } from 'react-router-dom';
import Collections from '../Collections/Collections'

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
        const classesDict = {
            "shoes": classes.shoes,
            "venice": classes.venice,
            "tamu": classes.tamu,
            "yellowstone": classes.yellowstone
        }

        let renderedCollections = Collections.map((el) => {
            if (el.rendered) {
                const shorthand = el.url
                return (<div className="seven wide column" >
                    <Link to={"/moreinfo/" + el.url}>
                        <div className={this.classDeterminer("Shoes") + " " + classesDict[shorthand]}>
                            <h3 style={{ "fontSize": "24px" }}>
                                {el.name}
                            </h3>
                            <img src={el.img} alt={el.name} style={{ "height": "300px", "marginLeft": "50px" }}></img>
                        </div>
                    </Link>
                </div>)
            }
        })

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
                    <div className={classes.popular}>
                        <div className="ui grid">
                            {renderedCollections}
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