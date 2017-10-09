import React from 'react';

const Pagination = props => {
  const { pageData } = props;
  const pages = [...Array(pageData.total)] //Cria uma array com o número de items para compor a páginação
    .map((item, i) => {
      if (i > 0) {
        if (pageData.total > 10) {
          //Define se a paginação terá mais de 10 itens e será dinamica
          if (pageData.page <= pageData.total - 6) {
            if (i >= pageData.page - 1 && i < pageData.page + 4) {
              //Retorna os links números menores da paginação e equaliza o número da pageData para a numeração de indice 0 utilizada pela Array
              if (i < 50) {
                //Filtro que lida com a limitação da api pública do GitHub de retornar apenas os 1000 primeiros resultados de uma busca
                return (
                  <span
                    key={i}
                    className="pagination-link"
                    style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
                  >
                    <a href="" onClick={e => props.handleChangePage(e, i + 1)}>
                      &nbsp;{i + 1}&nbsp;
                    </a>
                  </span>
                );
              } else {
                return (
                  <span
                    key={i}
                    className="pagination-link"
                    style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
                  >
                    &nbsp;{i + 1}&nbsp;
                  </span>
                );
              }
            }
          } else {
            //Constrói a paginação se a diferença entre o número da paginação e o número total de páginas for menor que 5
            if (i <= 4) {
              return (
                <span
                  key={i}
                  className="pagination-link"
                  style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
                >
                  <a href="" onClick={e => props.handleChangePage(e, i + 1)}>
                    &nbsp;{i + 1}&nbsp;
                  </a>
                </span>
              );
            }
            if (i === 5) {
              //Retorna o objeto para servir de intermediário caso o número da paginação e o número total de páginas for menor que 5
              return (
                <span key={i} className="pagination-link">
                  ...
                </span>
              );
            }
          }
          if (i === pageData.page + 6) {
            //Retorna o objeto para servir de intermediário na paginação na paginação normal
            return (
              <span key={i} className="pagination-link">
                ...
              </span>
            );
          }
          if (i > pageData.total - 3) {
            //Retorna os links dos últimos números da paginação
            if (i - 1 + pageData.page > pageData.total - 3) {
              if (i <= 50) {
                // Filtro que não permite que as páginas com resultados acima de 1000 se tornem links, devido a limitação da API pública do Github
                return (
                  <span
                    key={i}
                    className="pagination-link"
                    style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
                  >
                    <a href="" onClick={e => props.handleChangePage(e, i + 1)}>
                      &nbsp;{i + 1}&nbsp;
                    </a>
                  </span>
                );
              } else {
                return (
                  <span
                    key={i}
                    className="pagination-link"
                    style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
                  >
                    &nbsp;{i + 1}&nbsp;
                  </span>
                );
              }
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        } else {
          //Se a paginação tiver menos de 10 itens, exibe todos as páginas como links
          return (
            <span
              key={i}
              className="pagination-link"
              style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
            >
              <a href="" onClick={e => props.handleChangePage(e, i + 1)}>
                &nbsp;{i + 1}&nbsp;
              </a>
            </span>
          );
        }
      } else {
        return (
          <span
            key={i}
            className="pagination-link"
            style={i + 1 === pageData.page ? { borderBottom: '1px solid black' } : { border: 'none' }}
          >
            <a href="" onClick={e => props.handleChangePage(e, i + 1)}>
              &nbsp;1{pageData.page > 2 ? '...' : ''}&nbsp;
            </a>
          </span>
        );
      }
    })
    .filter(item => item !== undefined);

  pages.unshift(
    //Insere o botão de retornar uma página
    <span key="anterior" className="pagination-link pagination-previous">
      <a
        href=""
        onClick={
          pageData.page > 1
            ? e => props.handleChangePage(e, pageData.page - 1)
            : e => {
                e.preventDefault();
              }
        }
      >
        &nbsp;<i className="fa fa-chevron-left" aria-hidden="true" />{' '}
        <span className="pagination-previous-text">Anterior</span>
      </a>
    </span>
  );

  pages.push(
    //Insere o botão de prosseguir para a próxima página
    <span key="proxima" className="pagination-link pagination-next">
      <a
        href=""
        onClick={
          pageData.page >= 1 && pageData.page <= 50
            ? e => props.handleChangePage(e, pageData.page + 1)
            : e => {
                e.preventDefault();
              }
        }
      >
        <span className="pagination-next-text">Próxima</span> <i className="fa fa-chevron-right" aria-hidden="true" />
      </a>
    </span>
  );
  return pages;
};

export default Pagination;
