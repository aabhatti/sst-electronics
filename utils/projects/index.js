const userProject = {
  $project: {
    _id: 1,
    id: { $toString: "$_id" },
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
};

const dealProject = {
  $project: {
    _id: 1,
    id: { $toString: "$_id" },
    name: 1,
    userName: 1,
    worth: 1,
    advance: 1,
    due: 1,
    description: 1,
    referenceOne: {
      id: { $toString: "$referenceOne._id" },
      email: 1,
      cnic: 1,
      name: 1,
      mobile: 1,
    },
    referenceTwo: {
      id: { $toString: "$referenceTwo._id" },
      email: 1,
      cnic: 1,
      name: 1,
      mobile: 1,
    },
    createdAt: 1,
    updatedAt: 1,
  },
};

const installmentProject = {
  $project: {
    _id: 1,
    id: { $toString: "$_id" },
    userName: 1,
    dealName: 1,
    amount: 1,
    createdAt: 1,
    updatedAt: 1,
  },
};

export { userProject, dealProject, installmentProject };
