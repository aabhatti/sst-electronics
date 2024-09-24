const referenceOneLookup = {
  $lookup: {
    from: "users",
    localField: "referenceOne",
    foreignField: "_id",
    as: "referenceOne",
  },
};

const referenceTwoLookup = {
  $lookup: {
    from: "users",
    localField: "referenceTwo",
    foreignField: "_id",
    as: "referenceTwo",
  },
};

module.exports = {
  referenceOneLookup,
  referenceTwoLookup,
};
