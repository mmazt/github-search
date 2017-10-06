import axios from 'axios';
import * as list from './requestList';

const getData = (tipo, dados) => {
  let url = 'https://api.github.com';

  switch (tipo) {
    case list.search:
      url += `/search/users?q=${dados.searchTerm}&page=${dados.page}&per_page=20`;
      break;
    case list.user:
      url += `/users/${dados}`;
      break;
    case list.repos:
      url += `/users/${dados}/repos`;
      break;
    case list.repoDetails:
      url += `/repos/${dados.user}/${dados.repo}`;
      break;
    default:
      url += '/';
      return;
  }

  let request = new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data);
    });
  });

  return request;
};

export default getData;
