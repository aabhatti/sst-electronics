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

export { nameAddField, userNameAddField };
