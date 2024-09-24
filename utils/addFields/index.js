const userNameAddField = {
  $addFields: {
    userName: {
      $concat: ["$user.firstName", " ", "$user.lastName"],
    },
  },
};

const nameAddField = {
  $addFields: {
    name: {
      $concat: ["$firstName", " ", "$lastName"],
    },
  },
};

const referenceOneAddField = {
  $addFields: {
    referenceOne: { $arrayElemAt: ["$referenceOne", 0] },
  },
};

const referenceTwoAddField = {
  $addFields: {
    referenceTwo: { $arrayElemAt: ["$referenceTwo", 0] },
  },
};

export {
  nameAddField,
  userNameAddField,
  referenceOneAddField,
  referenceTwoAddField,
};
