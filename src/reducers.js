import * as types from './actions/actions';

const DEFAULT_STATE = {
  searchTerm: '',
  searchData: [],
  userData: {},
  reposData: [],
  repoDetails: {},
  pageData: { total: 0, page: 0 }
};

const setSearchTerm = (state, action) => Object.assign({}, state, { searchTerm: action.payload });
const setSearchData = (state, action) => Object.assign({}, state, { searchData: action.payload });
const setUserData = (state, action) => Object.assign({}, state, { userData: action.payload });
const setReposData = (state, action) => Object.assign({}, state, { reposData: action.payload });
const setRepoDetails = (state, action) => Object.assign({}, state, { repoDetails: action.payload });
const setPaginationData = (state, action) => Object.assign({}, state, { pageData: action.payload });

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
    case types.SET_REPO_DETAILS:
      return setRepoDetails(state, action);
    case types.SET_PAGINATION_DATA:
      return setPaginationData(state, action);
    default:
      return state;
  }
};

export default rootReducer;
