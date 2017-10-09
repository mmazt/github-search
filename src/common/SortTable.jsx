const SortTable = (repositories, sort) => {
  repositories.sort((a, b) => {
    if (sort === true) {
      if (a.stargazers_count > b.stargazers_count) {
        return -1;
      }
      if (a.stargazers_count < b.stargazers_count) {
        return 1;
      }
      return 0;
    }
    if (sort === false) {
      if (a.stargazers_count < b.stargazers_count) {
        return -1;
      }
      if (a.stargazers_count > b.stargazers_count) {
        return 1;
      }
      return 0;
    }
    return undefined;
  });

  return repositories;
};

export default SortTable;
