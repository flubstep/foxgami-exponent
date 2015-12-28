/**
 * @providesModule FoxgamiApi
 */

'use strict';

let {stringify} = require('querystring');
let React = require('react-native');
let {AsyncStorage} = React;
let Firebase = require('firebase');

let REQUEST_BASE = 'http://www.foxgami.com/api';
let rootRef = new Firebase('https://foxgami.firebaseio.com/');


async function get(path, query = {}) {
  let REQUEST_URL = REQUEST_BASE + path;
  if (query) {
    REQUEST_URL += '?' + stringify(query);
  }
  let response = await fetch(REQUEST_URL)
  return response.json();
}


async function post(path, data) {
  let REQUEST_URL = REQUEST_BASE + path;
  let response = await fetch(REQUEST_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
}


// AUTHENTICATION


async function setUserFromApi(returnInfo) {
  if (returnInfo.data && returnInfo.extra) {
    let user = returnInfo.data;
    let accessToken = returnInfo.extra.session;
    if (!user) {
      throw new Error('No user object included in return.')
    }
    if (!accessToken) {
      throw new Error('No access token included in return.')
    }
    // TODO: Seems weird to just make this just copy the entire struct
    // to another signature; maybe consolidate the storage.
    await saveUserAsync({
      username: user.name,
      userId: user.id,
      accessToken: accessToken,
    });
    return user;
  } else {
    throw new Error('Invalid user object from API endpoint.');
  }
}


async function signupNewUser(username, email, password) {
  let returnInfo = await post('/users', {
    name: username,
    email: email,
    password: password
  });
  return await setUserFromApi(returnInfo);
}


async function loginUser(email, password) {
  let returnInfo = await post('/login', {
    email, password
  });
  return await setUserFromApi(returnInfo);
}


async function getCurrentUser() {
  let user = await getUserAsync();
  if (user) {
    return get('/users', { token: user.accessToken });
  } else {
    return get('/users');
  }
}

async function getUserAsync() {
  let results = await AsyncStorage.multiGet([
    'FoxgamiUsername',
    'FoxgamiAccessToken',
    'FoxgamiUserId',
  ]);
  let user = {};
  for (var i in results) {
    let [key, val] = results[i];
    switch (key) {
      case 'FoxgamiUsername':
        user.username = val;
        break;
      case 'FoxgamiAccessToken':
        user.accessToken = val;
        break;
      case 'FoxgamiUserId':
        user.userId = val;
        break;
      default:
        throw new Error('Confused about getting key ' + key + ' in user results object');
    }
  }

  if (!user.userId || !user.accessToken) {
    return null;
  } else {
    return user;
  }
}

async function saveUserAsync(user) {
  let toSet = [
    ['FoxgamiUsername', user.username],
    ['FoxgamiAccessToken', user.accessToken],
    ['FoxgamiUserId', user.userId],
  ];
  return await AsyncStorage.multiSet(toSet);
}

async function removeUserAsync() {
  let keys = ['FoxgamiUsername', 'FoxgamiAccessToken', 'FoxgamiUserId']
  return await AsyncStorage.multiRemove(keys);
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
    signupNewUser,
    loginUser,
    addReaction,
    subscribeReaction,
    getUserAsync,
    saveUserAsync,
    removeUserAsync
});