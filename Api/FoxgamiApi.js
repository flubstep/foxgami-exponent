/**
 * @providesModule FoxgamiApi
 */

'use strict';

let {stringify} = require('querystring');
let Firebase = require('firebase');

let REQUEST_BASE = 'http://www.foxgami.com/api';
let rootRef = new Firebase('https://foxgami.firebaseio.com/');


function get(path, query = {}) {
    let REQUEST_URL = REQUEST_BASE + path;
    if (query) {
        REQUEST_URL += '?' + stringify(query);
    }
    return fetch(REQUEST_URL).then((response) => { return response.json() });
}


function getCurrentUser() {
    return get('/users');
}


// REACTION OBJECTS

function objectToArray(obj) {
  if (!obj) {
    return [];
  }
  var ret = [];
  var ii = 0;
  while (typeof(obj[ii]) !== "undefined") {
    ret.push(obj[ii]);
    ii++;
  }
  return ret;
}


// TODO:
function addReaction(storyId, reaction) {

}


// TODO: Move this to Redux, emits
function subscribeReaction(storyId, callback) {
  rootRef.child('reactions').child(storyId).on('value', (container) => {
    let reactionsRaw = objectToArray(container.val());
    let reactions = reactionsRaw.map((rawObj) => {
      return objectToArray(rawObj);
    });
    callback(reactions);
  });
}


Object.assign(module.exports, {
    get,
    getCurrentUser,
    addReaction,
    subscribeReaction,
});