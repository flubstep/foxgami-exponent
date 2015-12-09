/**
 * @providesModule FoxgamiApi
 */

'use strict';

let REQUEST_BASE = 'http://www.foxgami.com/api';

function get(path, query = {}) {
    let REQUEST_URL = REQUEST_BASE + path;
    return fetch(REQUEST_URL).then((response) => { return response.json() });
}

Object.assign(module.exports, {
    get
});