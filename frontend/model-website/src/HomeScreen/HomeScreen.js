import React, { Component } from 'react';
import classes from './HomeScreen.module.css';
import BottomNav from './BottomNav/BottomNav'

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
                        Is This A Recycle Bin?
                    </h3>
                    <img src = "eco-battery.png" style = {{"width":"auto"}}></img>
                </div>
                
                </div>
                <div class="eight wide column">
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
                        Is This A Burning Tree?
                    </h3>
                    <img src = "wildfire.png" style = {{"width":"auto"}}></img>
                </div>
                
                </div>
            </div>
            <div className="row">
                <div class="eight wide column">
                <div style = {{
                        "background": "linear-gradient(0deg, rgba(65,7,7,1) 0%, rgba(80,0,0,1) 100%)",
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
                        Which One Of The 50 Statues On Campus Is This?
                    </h3>
                    <img src = "museum.png" style = {{"width":"auto"}}></img>
                </div>                </div>
                <div class="eight wide column">
                <div style = {{
                        "background": "linear-gradient(0deg, rgba(243,218,78,1) 0%, rgba(233,207,115,1) 100%)",
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
                        LAX Airport Museum Art Guide
                    </h3>
                    <img src = "airportmuseum.png" style = {{"width":"auto"}}></img>
                </div>
                </div>
            </div>
        </div>
        <h3>Assisted</h3>
        <div class="ui grid">
            <div className="row">
                <div class="eight wide column">
                <div style = {{
                        "background": "blue",
                        "width": "auto",
                        "max-height": "400px",
                        "color": "white",
                        "border-radius": "10px",
                        "text-align": "left",
                        "padding": "10px",
                        "mix-blend-mode": "difference",
                        "overflow": "hidden"
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