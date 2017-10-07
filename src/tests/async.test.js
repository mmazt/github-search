import moxios from 'moxios';
import getData from '../requests/Requests';

test('getData - Pesquisa', done => {
  moxios.withMock(() => {
    getData('search', { searchTerm: 'teste', page: 1 });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: 'teste'
        })
        .then(() => {
          expect(request.url).toEqual(`https://api.github.com/search/users?q=teste&page=1&per_page=20`);
          done();
        });
    });
  });
});

test('getData - Dados do Usuário', done => {
  moxios.withMock(() => {
    getData('user', 'teste');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: 'teste'
        })
        .then(() => {
          expect(request.url).toEqual(`https://api.github.com/users/teste`);
          done();
        });
    });
  });
});

test('getData - Lista de Repositórios', done => {
  moxios.withMock(() => {
    getData('repos', 'user_teste');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: 'teste'
        })
        .then(() => {
          expect(request.url).toEqual(`https://api.github.com/users/user_teste/repos`);
          done();
        });
    });
  });
});

test('getData - Dados do Repositório Específico', done => {
  moxios.withMock(() => {
    getData('repoDetails', { user: 'user_teste', repo: 'repo_teste' });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: 'teste'
        })
        .then(() => {
          expect(request.url).toEqual(`https://api.github.com/repos/user_teste/repo_teste`);
          done();
        });
    });
  });
});
