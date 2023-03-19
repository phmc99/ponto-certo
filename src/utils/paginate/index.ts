export const paginate = (data: any, page: number, perPage = 4) => {
  page = page.toString() === 'NaN' ? 1 : page;
  perPage = perPage.toString() === 'NaN' ? 5 : perPage;

  const lastPage = Math.ceil(data.length / perPage);

  if (page > lastPage) {
    page = lastPage;
  }

  const start = (page - 1) * perPage;

  const end = start + perPage;

  const dataSliced = data.slice(start, end);

  const previousPage = page - 1 >= 1 ? page - 1 : null;
  const nextPage = end < data.length ? page + 1 : null;

  return {
    page,
    perPage: perPage,
    previousPage: previousPage,
    nextPage: nextPage,
    lastPage: lastPage,
    count: data.length,
    content: dataSliced,
  };
};
