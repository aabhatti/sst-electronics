const getPaginationFacet = (obj = {}) => {
  return {
    $facet: {
      paginatedData: [
        { $sort: { _id: -1 } },
        { $skip: obj.pageLimit },
        { $limit: obj.limit },
        { $project: { __v: 0 } },
      ],
    },
  };
};

const totalCountFacet = {
  $facet: {
    totalCount: [{ $count: "count" }],
  },
};

const getPaginationWithTotalCountFacet = (obj = {}) => {
  return {
    $facet: {
      paginatedData: [
        { $sort: { _id: -1 } },
        { $skip: obj.pageLimit },
        { $limit: obj.limit },
        { $project: { __v: 0 } },
      ],
      totalCount: [{ $count: "count" }],
    },
  };
};

export {
  getPaginationFacet,
  totalCountFacet,
  getPaginationWithTotalCountFacet,
};
