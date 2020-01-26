import React, { Component } from 'react';
import './App.css';
import HomeScreen from './HomeScreen/HomeScreen';
import MoreInfo from './MoreInfo/MoreInfo';
import Collections from './Collections/Collections';
import { HashRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render(){
    let allCollections = Collections.map((el) => {
      return <Route exact path={"/moreinfo/" + el.url} render={(routeProps) => <MoreInfo content={el} {...routeProps} />} key={el.name} />
    })
    return (
      <HashRouter basename="/">
        <div className="App">
              <Switch>
                <Route exact path="/" render={() => <HomeScreen />} />
                {allCollections}
              </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
