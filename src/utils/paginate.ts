export interface paginate {
  limit: number;
  offset: number;
}

const paginateOptions = (req: any): paginate => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 15;
  return {
    limit: perPage,
    offset: (page - 1) * perPage,
  };
};

export { paginateOptions };
