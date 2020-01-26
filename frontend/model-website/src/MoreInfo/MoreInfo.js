import React, { Component } from 'react';
import classes from './MoreInfo.module.css';
import BottomNav from '../BottomNav/BottomNav';
import Slider from 'react-slick';

class MoreInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            likes: this.props.content.likes
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        const newClicked = !this.state.clicked
        let newLikes = this.state.likes
        if (newClicked){
            newLikes += 1
        }
        else{
            newLikes -= 1
        }
        this.setState({clicked: newClicked, likes: newLikes})
    }

    render() {
        let images = this.props.content.images.map((el, i) => {
            return(
                <div className={classes.img}>
                    <img src={el} alt= "sample model image" />
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

        if (this.state.clicked){
            likeButton = "ui red button"
        }
        else{
            likeButton = "ui button"
        }

        return (
        <div className={classes.MoreInfo}>
                <Slider {...settings}>
                    {images}
                </Slider>
                <h1 className = {classes.ModelHeading}>Models For: {this.props.content.name}</h1>
                <p>Created by {this.props.content.creator}</p>
                <div class="ui labeled button" tabindex="0">
                    <button class={likeButton} onClick={this.clickHandler}>
                        <i class="heart icon"></i> Like
                    </button>
                    <div class="ui basic red left pointing label">
                        {this.state.likes}
                    </div>
                </div>
                <div>
                    <button className={classes.Demo+" "+classes.RoundButton}>Demo</button>
                </div>
                <div>
                    <button className={classes.Download+" "+classes.RoundButton}>Download</button>
                </div>                
                <BottomNav />
        </div>
        );
    }
}

export default MoreInfo;