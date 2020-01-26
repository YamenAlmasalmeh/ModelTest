import React, { Component } from 'react';
import classes from './HomeScreen.module.css';
import BottomNav from '../BottomNav/BottomNav';
import { Link } from 'react-router-dom';

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <div className = {classes.searchBar} class="ui search" style = {{"margin-top": "15px"}}>
            <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search" />
                <i class="search icon"></i>
            </div>
            <div class="results"></div>
        </div>
        <h1>Popular</h1>
        <div class="ui grid">
            <div className="row">
                    <div class="eight wide column" >
                    <Link to="/moreinfo/shoes">
                        <div style = {{
                            "background": "linear-gradient(0deg, rgba(230,213,248,1) 0%, rgba(217,193,255,1) 100%)",
                            "width": "auto",
                            "max-height": "400px",
                            "color": "white",
                            "border-radius": "10px",
                            "text-align": "left",
                            "padding": "10px",
                            "mix-blend-mode": "difference",
                            "overflow": "hidden"
                        }} >
                        <h3 style = {{"font-size": "24px"}}>
                            Shoes
                        </h3>
                        <img src = "slipper.png" style = {{"width":"auto"}}></img>
                        </div>
                        </Link>
                    </div>
            
                <div class="eight wide column">
                    <Link to="/moreinfo/venice">
                    <div style = {{
                        "background": "linear-gradient(0deg, rgba(246,190,88,1) 0%, rgba(249,151,83,1) 100%)",
                        "width": "auto",
                        "max-height": "400px",
                        "color": "white",
                        "border-radius": "10px",
                        "text-align": "left",
                        "padding": "10px",
                        "mix-blend-mode": "difference",
                        "overflow": "hidden"
                    }} >
                    <h3 style = {{"font-size": "24px"}}>
                        The City of Venice
                    </h3>
                    <img src = "eye-mask.png" style = {{"width":"auto"}}></img>
                </div>
                </Link>
                
                </div>
            </div>
            <div className="row">
                <div class="eight wide column">
                <Link to="/moreinfo/tamu">
                <div style = {{
                        "background": "linear-gradient(180deg, rgba(80,0,0,1) 0%, rgba(149,54,54,1) 100%)",
                        "width": "auto",
                        "max-height": "400px",
                        "color": "white",
                        "border-radius": "10px",
                        "text-align": "left",
                        "padding": "10px",
                        "mix-blend-mode": "difference",
                        "overflow": "hidden"
                    }} >
                    <h3 style = {{"font-size": "24px"}}>
                        Texas A&M Campus Guide
                    </h3>
                    <img src = "museum.png" style = {{"width":"auto"}}></img>
                </div> 
                </Link>               
                </div>

                <div class="eight wide column">
                <Link to="/moreinfo/yellowstone">
                <div style = {{
                        "background": "linear-gradient(180deg, rgba(126,192,238,1) 0%, rgba(194,221,241,1) 100%)",
                        "width": "auto",
                        "max-height": "400px",
                        "color": "white",
                        "border-radius": "10px",
                        "text-align": "left",
                        "padding": "10px",
                        "mix-blend-mode": "difference",
                        "overflow": "hidden"
                    }} >
                    <h3 style = {{"font-size": "24px"}}>
                        Yellowstone National Park Guide
                    </h3>
                    <img src = "forest.png" style = {{"width":"auto"}}></img>
                </div>
                </Link>  
                </div>
            </div>
        </div>
        <h3>Assisted</h3>
        <div class="ui grid">
            <div className="row">
                <div class="eight wide column">
                <div style = {{
                        "background": "linear-gradient(180deg, rgba(61,61,251,1) 0%, rgba(149,149,251,1) 100%)",
                        "width": "auto",
                        "max-height": "400px",
                        "color": "white",
                        "border-radius": "10px",
                        "text-align": "left",
                        "padding": "10px",
                        "mix-blend-mode": "difference",
                        "overflow": "hidden",
                        "marginBottom": "50px",
                    }} 
                >
                    <h3 style = {{"font-size": "24px"}}>Visual Aid</h3>
                    <img src = "sid-view.png" style = {{"width":"auto"}}></img>
                </div>
                
            </div>
        </div>
        <div style = {{"align":"center"}}>
            <BottomNav />
        </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;