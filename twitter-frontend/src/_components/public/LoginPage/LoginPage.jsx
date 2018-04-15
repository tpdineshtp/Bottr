import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TwitterLogin from 'react-twitter-auth';

import { userActions } from '../../../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = { isAuthenticated: false, user: null, token: ''};
        this.onSuccess = this.onSuccess.bind(this);
    }


    onSuccess(response) {
      const token = response.headers.get('x-auth-token');
      response.json().then(user => {
        if (user) {
          this.setState({isAuthenticated: true, user: user, token: token});
          this.props.dispatch(userActions.login(this.state.user));
        }
      });
    };

    onFailed (error) {
      alert(error);
    };

    logout() {
      this.setState({isAuthenticated: false, token: '', user: null})
    };

    render() {
      let content = !!this.state.isAuthenticated ?
        (
          <div>
            <p>Twitter authentication successful.</p>
            <div>
              You email is
              <span className="label label-primary"> {this.state.user.email}</span>
            </div>
            <br/>
            <br/>
            <div>
              <p>Click <Link to="/" className="btn btn-link"><button type="button" className="btn btn-primary">here</button> </Link> to goto twitter dashboard</p>
            </div>
          </div>
        ) :
        (
          <div>
          <div className="alert alert-info" role="alert">Please login to continue</div>
          <TwitterLogin loginUrl="http://localhost:4000/auth/twitter"
                        onFailure={this.onFailed} onSuccess={this.onSuccess}
                        requestTokenUrl="http://localhost:4000/auth/twitter/reverse"/>
          </div>
        );

      return (
        <div className="App">
          {content}
        </div>
      );
    }
}

function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    return {
        loggedIn, user
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
