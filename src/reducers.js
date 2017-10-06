import * as types from './actions';

const DEFAULT_STATE = {
  searchTerm: '',
  searchData: [],
  userData: {},
  reposData: []
};

const setSearchTerm = (state, action) => Object.assign({}, state, { searchTerm: action.payload });
const setSearchData = (state, action) => Object.assign({}, state, { searchData: action.payload });
const setUserData = (state, action) => Object.assign({}, state, { userData: action.payload });
const setReposData = (state, action) => Object.assign({}, state, { reposData: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return setSearchTerm(state, action);
    case types.SET_SEARCH_DATA:
      return setSearchData(state, action);
    case types.SET_USER_DATA:
      return setUserData(state, action);
    case types.SET_REPOS_DATA:
      return setReposData(state, action);
    default:
      return state;
  }
};

export default rootReducer;
