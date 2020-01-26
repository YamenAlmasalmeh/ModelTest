import React, { Component } from 'react';
import './App.css';
import HomeScreen from './HomeScreen/HomeScreen';
import MoreInfo from './MoreInfo/MoreInfo';
import Collections from './Collections/Collections';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Demo from './Demo/Demo';
import Favorites from './Favorites/Favorites';
import Create from './Create/Create';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        names: [],
        clicked: [],
        likes: []
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount(){
    const namesDict = Collections.map(el => {
      return el.name
    })
    const clickedDict = Collections.map(el => {
      return el.clicked
    })
    const likedDict = Collections.map(el => {
      return el.likes
    })
    this.setState({
      names: namesDict,
      clicked: clickedDict,
      likes: likedDict
    })
  }

  clickHandler(nameIndex) {
      let clicked = [...this.state.clicked]
      let likes = [...this.state.likes]
      clicked[nameIndex] = !clicked[nameIndex]
      if (clicked[nameIndex]){
          likes[nameIndex] += 1
      }
      else{
        likes[nameIndex] -= 1
      }
      this.setState({ clicked: clicked, likes: likes })
    }


  render(){
    let allCollections = Collections.map((el) => {
      return <Route exact path={"/moreinfo/" + el.url} render={(routeProps) => {
        const nameIndex = this.state.names.indexOf(el.name)
        return (<MoreInfo
          nameIndex={nameIndex}
          likes={this.state.likes[nameIndex]}
          content={el}
          clicked={this.state.clicked[nameIndex]}
          onClick={this.clickHandler} {...routeProps} />)}} key={el.name} />
    })

    let demoCollections = Collections.map((el) => {
      return <Route exact path={"/demo/" + el.url} render={(routeProps) => <Demo content={el} {...routeProps} />} key={el.name} />
    })
    return (
      <HashRouter basename="/">
        <div className="App">
              <Switch>
                <Route exact path="/" render={() => <HomeScreen />} />
                {allCollections}
                {demoCollections}
                <Route exact path="/favs" render={() => <Favorites names={this.state.names} likes={this.state.clicked} />} />
                <Route exact path="/create" render={() => <Create />} />
              </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
