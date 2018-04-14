import { authHeader } from '../_helpers';

export const userService = {
    add_tweet,
    logout,
    get_all_tweet
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

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
