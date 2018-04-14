import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_ALL_TWEET_SUCCESS:
      return {
        tweets: action.tweets
      };
    default:
      return state
  }
}
