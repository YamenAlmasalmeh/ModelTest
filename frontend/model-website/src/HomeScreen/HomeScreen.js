import React, { Component } from 'react';
import classes from './HomeScreen.module.css';
import BottomNav from '../BottomNav/BottomNav';
import { Link } from 'react-router-dom';

class HomeScreen extends Component {
  render() {
    return (
      <div>
          <div class="ui search">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="Search for Anything" />
            <i class="search icon"></i>
          </div>
          <div class="results"></div>
        </div>
        <h1>Popular</h1>
        <div class="ui grid">
            <div className="row">
                <div class="eight wide column">
                    <Link to="/moreinfo/toy-cars">
                        <img src="https://images.unsplash.com/photo-1532262018599-7083eccdb058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                    </Link>
                </div>
                <div class="eight wide column">
                    <img src="https://images.unsplash.com/photo-1532262018599-7083eccdb058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                </div>
            </div>
            <div className="row">
                <div class="eight wide column">
                    <img src="https://images.unsplash.com/photo-1532262018599-7083eccdb058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                </div>
                <div class="eight wide column">
                    <img src="https://images.unsplash.com/photo-1532262018599-7083eccdb058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                </div>
            </div>
        </div>
        <h3>Assisted</h3>
        <div class="ui grid">
            <div className="row">
                <div class="eight wide column">
                    <img src="https://images.unsplash.com/photo-1532262018599-7083eccdb058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                </div>
                <div class="eight wide column">
                    <img src="https://images.unsplash.com/photo-1532262018599-7083eccdb058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                </div>
            </div>
        </div>
        <BottomNav />
      </div>
    );
  }
}

export default HomeScreen;