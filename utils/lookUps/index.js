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

const userDealLookup = {
  $lookup: {
    from: "deals",
    localField: "_id",
    foreignField: "userId",
    as: "deals",
  },
};

const userInstallmentLookup = {
  $lookup: {
    from: "installments",
    localField: "_id",
    foreignField: "userId",
    as: "installments",
  },
};

const dealInstallmentLookup = {
  $lookup: {
    from: "installments",
    localField: "deals._id",
    foreignField: "dealId",
    as: "installments",
  },
};

const dealReferenceOneLookup = {
  $lookup: {
    from: "users",
    localField: "deals.referenceOne",
    foreignField: "_id",
    as: "referenceOne",
  },
};

const dealReferencesLookup = {
  $lookup: {
    from: "users",
    let: {
      refIds: { $concatArrays: ["$deals.referenceOne", "$deals.referenceTwo"] },
    },
    pipeline: [
      { $match: { $expr: { $in: ["$_id", "$$refIds"] } } },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          name: 1,
          email: 1,
          dob: 1,
          status: 1,
          mobile: 1,
          cnic: 1,
          address: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ],
    as: "references",
  },
};

const dealReferenceTwoLookup = {
  $lookup: {
    from: "users",
    localField: "deals.referenceTwo",
    foreignField: "_id",
    as: "deals.referenceTwo",
  },
};

module.exports = {
  referenceOneLookup,
  referenceTwoLookup,
  userDealLookup,
  userInstallmentLookup,
  dealInstallmentLookup,
  dealReferenceOneLookup,
  dealReferenceTwoLookup,
  dealReferencesLookup,
};
