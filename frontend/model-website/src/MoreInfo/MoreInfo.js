import React, { Component } from 'react';
import classes from './MoreInfo.module.css';
import BottomNav from '../BottomNav/BottomNav';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'

class MoreInfo extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.onClick(this.props.nameIndex)
    }

    render() {
        let images = this.props.content.images.map((el, i) => {
            return (
                <div className={classes.img} key={el}>
                    <img src={el} alt="sample model" />
                </div>
            )
        })

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        let likeButton = null

        if (this.props.clicked) {
            likeButton = "ui red button"
        }
        else {
            likeButton = "ui button"
        }

        return (
            <div className={classes.MoreInfo}>
                <Slider {...settings}>
                    {images}
                </Slider>
                <h1 className={classes.ModelHeading}>Models For: {this.props.content.name}</h1>
                <p>Created by {this.props.content.creator}</p>
                <div className="ui labeled button" tabIndex="0">
                    <button className={likeButton} onClick={this.handleClick}>
                        <i className="heart icon"></i> Like
                    </button>
                    <div className="ui basic red left pointing label">
                        {this.props.likes}
                    </div>
                </div>
                <div>
                    <Link to={"/demo/" + this.props.content.url}>
                        <button className={classes.Demo + " " + classes.RoundButton}>Demo</button>
                    </Link>
                </div>
                <div>
                    <button className={classes.Download + " " + classes.RoundButton}>Download</button>
                </div>
                <BottomNav />
            </div>
        );
    }
}

export default MoreInfo;