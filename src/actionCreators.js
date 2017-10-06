import * as types from './actions';

export function setSearchTerm(searchTerm) {
  return { type: types.SET_SEARCH_TERM, payload: searchTerm };
}

export function setSearchData(searchData) {
  return { type: types.SET_SEARCH_DATA, payload: searchData };
}

export function setUserData(userData) {
  return { type: types.SET_USER_DATA, payload: userData };
}

export function setReposData(reposData) {
  return { type: types.SET_REPOS_DATA, payload: reposData };
}
