import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { NavbarComponent } from './component';
import { Home, Sukses } from './pages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarComponent />
        <Router>
          <main>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/sukses" component={Sukses} exact />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;