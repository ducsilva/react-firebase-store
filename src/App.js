import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Create from './Create';
import Home from './Home';
import Show from './Show';

export default class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/create" component={Create}></Route>
            <Route path="/show/:id" component={Show}></Route>
          </Switch>
        </div>
       </BrowserRouter>
    );
  }
}