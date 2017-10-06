import axios from 'axios';

const getData = (tipo, dados) => {
  let url = 'https://api.github.com';

  switch (tipo) {
    case 'search':
      url += `/search/users?q=${dados}`;
      break;
    case 'user':
      url += `/users/${dados}`;
      break;
    case 'repos':
      url += `/users/${dados}/repos`;
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
