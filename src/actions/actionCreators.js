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

export function setRepoDetails(reposData) {
  return { type: types.SET_REPO_DETAILS, payload: reposData };
}

export function setPaginationData(pageData) {
  return { type: types.SET_PAGINATION_DATA, payload: pageData };
}
