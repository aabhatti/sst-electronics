const dealsUnwind = {
  $unwind: "$deals",
};

const dealsReferenceOneUnwind = {
  $unwind: {
    path: "$deals.referenceOne",
    preserveNullAndEmptyArrays: true,
  },
};

const dealsReferenceTwoUnwind = {
  $unwind: {
    path: "$deals.referenceTwo",
    preserveNullAndEmptyArrays: true,
  },
};

export { dealsUnwind, dealsReferenceOneUnwind, dealsReferenceTwoUnwind };
