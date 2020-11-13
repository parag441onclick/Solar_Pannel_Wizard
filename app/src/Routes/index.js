import React from "react";

import { Route, Switch } from "react-router-dom";

import history from "../history";

import Main from "../components/Main";
import Survey from "../components/Survey";

class Routes extends React.Component {
  render() {
    return (
      <div className='main text-center'>
        <Route path='/' exact component={Main} />
        <Route path='/survey/question/:id' exact component={Survey} />
      </div>
    );
  }
}

export default Routes;
