import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';
import { ListTweets } from './sub_components/list_tweets';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(userActions.get_all_tweet(this.props.user.email));

    this.state = { input_tweet: ''};
    this.handleInputTweet = this.handleInputTweet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputTweet(e) {
    this.setState({input_tweet : e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    if (this.state.input_tweet) {
      dispatch(userActions.add_tweet(this.props.user.email, this.state.input_tweet));
      this.setState({input_tweet :''})
    }
  }

    render() {
        return (
            <div align="center">
              <div className="page-header">
                <h3>  Hi
                  <span className="label label-primary">
                    {this.props.user.email}!
                  </span>
                </h3>
              </div>
              <div className="parent-div">
                <div className="input-tweet left-div">
                  Enter your tweet here
                  <br/>
                  <form id="tweet-form" onSubmit={this.handleSubmit} method="POST">
                    <input className="enter-tweet form-control" value={this.state.input_tweet} onChange={this.handleInputTweet} type="text" name="notes" placeholder="enter here"/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
                <div className="tweet-dashboard right-div">All of your tweets
                   <ListTweets/>
                </div>
              </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
