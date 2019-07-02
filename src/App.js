import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/Home';

import MapIndex from './components/Map/index';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container text-center mt-5">
          <Link to="/" className="mr-5">Início</Link>
          <Link to="/mapa/">Mapa</Link>
          <Route path="/" exact component={Home} />
          <Route path="/mapa/" component={MapIndex} />
        </div>
      </Router>
    );
  }
}

export default App;
