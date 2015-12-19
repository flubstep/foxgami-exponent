/**
 * @providesModule FoxgamiApi
 */

'use strict';

let {stringify} = require('querystring');

let REQUEST_BASE = 'http://www.foxgami.com/api';

function get(path, query = {}) {
    let REQUEST_URL = REQUEST_BASE + path;
    if (query) {
        REQUEST_URL += '?' + stringify(query);
    }
    return fetch(REQUEST_URL).then((response) => { return response.json() });
}

function getCurrentUser() {
    return get('/users', {token: '1234'});
}

Object.assign(module.exports, {
    get,
    getCurrentUser
});