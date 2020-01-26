import React, { Component } from 'react';
import classes from './Favorites.module.css';
import BottomNav from '../BottomNav/BottomNav';
import { Link } from 'react-router-dom';
import Coll from '../Collections/Collections';

class Favorites extends Component {
    render() {
        const Collections = Coll.getCollections();
        const classesDict = {
            "shoes": classes.shoes,
            "venice": classes.venice,
            "tamu": classes.tamu,
            "yellowstone": classes.yellowstone
        }

        let likedModels = this.props.likes.map((el, i) => {
            const name = this.props.names[i]
            if (el) {
                let likedModel = null
                for (let i = 0; i < Collections.length; i++) {
                    if (Collections[i].name === name) {
                        likedModel = Collections[i]
                    }
                }
                const shorthand = likedModel.url
                return (<div className="fourteen wide column" key={name}>
                    <Link to={"/moreinfo/" + likedModel.url}>
                        <div className={classes.collection + " " + classesDict[shorthand]}>
                            <h3 style={{ "fontSize": "24px" }}>
                                {name}
                            </h3>
                            <img src={likedModel.img} alt={name} style={{ "height": "240px", "marginLeft": "80px" }}></img>
                        </div>
                    </Link>
                </div>)
            }
        })
        return (
            <div className={classes.Favorites}>
                <div className={classes.grid}>
                    <h1>Your Favorites</h1>

                    <div className={"ui grid " + classes.grid}>
                        {likedModels}
                    </div>
                </div>
                <BottomNav />
            </div>
        );
    }
}

export default Favorites;