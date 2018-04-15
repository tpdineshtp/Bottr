import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_ALL_TWEET_SUCCESS:
      return {
        tweets: action.tweets
      };
      case userConstants.ADD_TWEET_SUCCESS:
        return {
          tweet_added: action.tweet,
          page_refresh: Math.random()
        };
    default:
      return state
  }
}
