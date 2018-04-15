import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../../../_services';
import { userActions } from '../../../_actions';

class DetailedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id: '',
          tweet_message: '',
          username: '',
          views: '',
          upvote: '',
          downvote: ''
        };
    }

    componentWillMount(){
      var url = 'http://localhost:4000/users/get_tweet/' + this.props.match.params.tweetId;
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(function(response) {
        return response.json();
      }.bind(this)).then(function(data) {
        this.setState({
          tweet_message : data[1].tweet,
          username : data[1].username,
          views: data[0].views,
          upvote: data[0].upvote,
          downvote: data[0].downvote,
          id: data[1]._id
        })
      }.bind(this));
    }

    handleUpvote(id){
       userService.upvote(id)
    }

    handleDownvote(id){
       userService.downvote(id)
    }

    render() {
      return (
        <div>
          <p>Tweet Added by:
            <span className="label label-primary">
              {this.state.username}
            </span>
          </p>
          <br/>
          <p>Tweet Message:
            <span className="label label-primary">
              {this.state.tweet_message}
            </span>
          </p>
          <br/>
          <p>Tweet Views:
            <span className="label label-primary">
              {this.state.views} views
            </span>
          </p>
          <br/>
          <button type="button" id="upvote-button" className="btn btn-primary" onClick={this.handleUpvote(this.state.id)}>Upvote <span className="badge">{this.state.upvote ? this.state.upvote: 0}</span></button>
          <button type="button" id="downvote-button" className="btn btn-primary" onClick={this.handleDownvote(this.state.id)}>Downvote <span className="badge">{this.state.downvote ? this.state.downvote: 0}</span></button>
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

const connectedDetailedView = connect(mapStateToProps)(DetailedView);
export { connectedDetailedView as DetailedView };
