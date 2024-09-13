function paginate(data) {
  let totalPages = Math.ceil(data?.totalCount / data?.perPage);
  if (totalPages < 1) totalPages = 1;

  pageNumber =
    pageNumber < 1
      ? 1
      : pageNumber > totalPages
      ? totalPages
      : data?.pageNumber;

  const skipValue = (pageNumber - 1) * data?.perPage;

  return { totalPages, skipValue };
}

module.exports = { paginate };
