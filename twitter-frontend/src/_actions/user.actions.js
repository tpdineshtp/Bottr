import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';

export const userActions = {
  add_tweet,
  get_all_tweet,
  login,
};

function login(user) {
  return dispatch => {
    localStorage.setItem('cur_user', JSON.stringify(user.email));
    dispatch(success(user));
    dispatch(userActions.get_all_tweet(user.email));
  };
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
}

function add_tweet(username, tweet) {
  return dispatch => {
    userService.add_tweet(username, tweet)
      .then(
          result => {
            dispatch(success(tweet));
            alert("tweet added");
          },
          error => {
              dispatch(failure(error));
          }
      );
  };
  function success(user) { return { type: userConstants.ADD_TWEET_SUCCESS, user } }
  function failure(error) { return { type: userConstants.ADD_TWEET_FAILURE, error } }
}

function get_all_tweet(username){
  return dispatch => {
    userService.get_all_tweet(username)
      .then(
        tweets => {
          dispatch(success(tweets));
        },
        error => {
          dispatch(failure(error));
        }
      );
  }
  function success(tweets) { return { type: userConstants.GET_ALL_TWEET_SUCCESS, tweets } }
  function failure(error) { return { type: userConstants.GET_ALL_TWEET_FAILURE, error } }
}
