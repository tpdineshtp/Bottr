import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../_assets/styles.css'

import { history } from '../_helpers';
import { PrivateRoute } from '../_components';
import { HomePage } from '../_components/public/HomePage';
import { LoginPage } from '../_components/public/LoginPage';
import { DetailedView } from '../_components/public/DetailedView';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron">
              <div className="container">
                <Router history={history}>
                  <div>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/tweet/:tweetId" component={DetailedView} />
                  </div>
                </Router>
              </div>
          </div>
        );
    }
}

export { App };
