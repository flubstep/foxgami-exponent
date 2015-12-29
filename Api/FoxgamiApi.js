/**
 * @providesModule FoxgamiApi
 */

'use strict';

let React = require('react-native');
let {AsyncStorage} = React;
let Firebase = require('firebase');

let {stringify} = require('querystring');
let {createStore} = require('redux');

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

const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_FROM_API':
      return action.user;
    case 'REMOVE_USER':
      return {
        name: '',
        userId: 0,
        profileImageUrl: '',
        accessToken: ''
      };
    default:
      return state;
  }
}

const currentUserStore = createStore(user);


async function setUserFromApi(returnInfo) {
  if (returnInfo.data) {
    let user = returnInfo.data;
    let accessToken = returnInfo.extra ? returnInfo.extra.session : null;
    if (!user) {
      throw new Error('No user object included in return.')
    }
    // TODO: Seems weird to just make this just copy the entire struct
    // to another signature; maybe consolidate the storage.
    if (user.id && accessToken) {
      await saveUserAsync({
        username: user.name,
        userId: user.id,
        accessToken: accessToken,
      });
    }

    currentUserStore.dispatch({
      type: 'SET_USER_FROM_API',
      user: {
        name: user.name,
        userId: user.id,
        profileImageUrl: user.profile_image_url,
        accessToken: accessToken
      }
    });
    return user;
  } else {
    throw new Error('Invalid user object from API endpoint: ' + JSON.stringify(returnInfo));
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


async function logoutUser() {
  let result = await removeUserAsync();
  currentUserStore.dispatch({
    'type': 'REMOVE_USER'
  });
}


async function fetchCurrentUser() {
  let {accessToken} = await getUserAsync();
  let returnInfo = await get('/users', {token: accessToken});
  if (returnInfo) {
    setUserFromApi(returnInfo);
  } else {
    throw new Error('No object returned when getting current logged in user.')
  }
}


function subscribeUser(callback) {
  currentUserStore.subscribe(() => {
    callback(currentUserStore.getState());
  });
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
    return {
      username: null,
      userId: 0,
      accessToken: null
    };
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


// STORY FEED OBJECTS

const storyList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_STORIES':
      return state.concat(action.stories);
    default:
      return state;
  }
}

const storiesStore = createStore(storyList);


async function fetchStories() {
  let state = storiesStore.getState();
  let apiQuery = {};
  if (state.length > 0) {
    // TODO: include 'after' query here
  }
  let storyResults = await get('/stories', apiQuery);
  storiesStore.dispatch({
    'type': 'ADD_STORIES',
    'stories': storyResults
  });
}


function subscribeStories(callback) {
  // TODO: consolidate this with the Redux store for current user
  storiesStore.subscribe(() => {
    callback(storiesStore.getState());
  });
}


Object.assign(module.exports, {
    get,
    fetchCurrentUser,
    subscribeUser,
    signupNewUser,
    loginUser,
    logoutUser,
    addReaction,
    subscribeReaction,
    getUserAsync,
    saveUserAsync,
    removeUserAsync,
    fetchStories,
    subscribeStories
});