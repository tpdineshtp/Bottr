import { authHeader } from '../_helpers';

export const userService = {
    add_tweet,
    logout,
    get_all_tweet,
    upvote,
    downvote
};

function add_tweet(username, tweet) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, tweet })
  };

  return fetch('http://localhost:4000/users/add_tweet', requestOptions)
    .then(response => {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }

        return response.json();
    })
    .then(res => {
        return res;
    });
}

function get_all_tweet(username) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  };

    return fetch('http://localhost:4000/users/get_all_tweet', requestOptions)
      .then(response => {
          if (!response.ok) {
              return Promise.reject(response.statusText);
          }
          return response.json();
      })
      .then(res => {
          return res;
      });
}


function upvote(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  var url = 'http://localhost:4000/users/upvote/' + id;
  return fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }

        return response.json();
    })
    .then(res => {
        console.log(res);
    });
}

function downvote(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  var url = 'http://localhost:4000/users/downvote/' + id;
  return fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    })
    .then(res => {
        console.log(res);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('cur_user');
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
