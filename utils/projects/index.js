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
    deals: 1,
    totalWorth: { $sum: "$deals.worth" },
    totalPaid: { $sum: "$deals.paid" },
    totalDue: { $sum: "$deals.due" },
    totalInstallments: { $sum: "$deals.noOfInstallments" },
    totalPaidInstallments: { $sum: "$deals.paidInstallments" },
    noOfDeals: { $size: "$deals" },
  },
};

const userDetailsProject = {
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
    deals: {
      $map: {
        input: "$deals",
        as: "deal",
        in: {
          _id: "$$deal._id",
          name: "$$deal.name",
          userName: "$$deal.userName",
          worth: "$$deal.worth",
          paid: "$$deal.paid",
          due: "$$deal.due",
          noOfInstallments: "$$deal.noOfInstallments",
          description: "$$deal.description",
          createdAt: "$$deal.createdAt",
          updatedAt: "$$deal.updatedAt",
          installments: {
            $filter: {
              input: "$installments",
              as: "installment",
              cond: { $eq: ["$$installment.dealId", "$$deal._id"] },
            },
          },
          referenceOne: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$references",
                  as: "ref",
                  cond: { $eq: ["$$ref._id", "$$deal.referenceOne"] },
                },
              },
              0,
            ],
          },
          referenceTwo: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$references",
                  as: "ref",
                  cond: { $eq: ["$$ref._id", "$$deal.referenceTwo"] },
                },
              },
              0,
            ],
          },
        },
      },
    },
  },
};

const dealProject = {
  $project: {
    _id: 1,
    id: { $toString: "$_id" },
    name: 1,
    userName: 1,
    userId: 1,
    worth: 1,
    paid: 1,
    due: 1,
    noOfInstallments: 1,
    paidInstallments: 1,
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
    userId: 1,
    userName: 1,
    dealName: 1,
    dealDues: 1,
    dealId: 1,
    amount: 1,
    date: 1,
    status: 1,
    receipt: 1,
  },
};

export { userProject, userDetailsProject, dealProject, installmentProject };
