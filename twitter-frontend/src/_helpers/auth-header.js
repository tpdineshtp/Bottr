export function authHeader() {
    // return authorization header with jwt token
    let user = localStorage.getItem('cur_user');

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
