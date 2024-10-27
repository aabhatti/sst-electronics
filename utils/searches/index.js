import moment from "moment";

const getDatesSearchCondition = (searchQuery) => {
  let dateCondition = [];
  const possibleDateFormats = [
    "HH:mm:ss",
    "HH:mm",
    "HH",
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-MM-DD HH:mm",
    "YYYY-MM-DD HH",
    "YYYY-MM-DD",
    "YYYY-MM",
    "YYYY",
    "D MMMM, YYYY",
  ];

  const endDateConditions = [
    "second",
    "minute",
    "hour",
    "second",
    "minute",
    "hour",
    "day",
    "month",
    "year",
    "days",
  ];

  for (let i = 0; i < possibleDateFormats.length; i++) {
    let format = possibleDateFormats[i];

    if (moment(searchQuery, format, true).isValid()) {
      const startDateTime = moment(searchQuery, format)
        .subtract(process.env.DIFF_TIME_ZONE, "hour")
        .format(format);

      const enddDateTime = moment(startDateTime)
        .add(1, endDateConditions[i])
        .toDate();

      dateCondition = [
        {
          createdAt: {
            $gte: new Date(startDateTime),
            $lt: enddDateTime,
          },
        },
        {
          updatedAt: {
            $gte: new Date(startDateTime),
            $lt: enddDateTime,
          },
        },
      ];
      break;
    }
  }
  return dateCondition;
};

const getUserSearchCondition = (searchTerm) => {
  return [
    { name: { $regex: searchTerm, $options: "i" } },
    { email: { $regex: searchTerm, $options: "i" } },
    { status: { $regex: searchTerm, $options: "i" } },
  ];
};

const getDealSearchCondition = (searchTerm) => {
  return [
    { name: { $regex: searchTerm, $options: "i" } },
    { userName: { $regex: searchTerm, $options: "i" } },
    { worth: { $regex: searchTerm, $options: "i" } },
    { due: { $regex: searchTerm, $options: "i" } },
  ];
};

const getInstallmentSearchCondition = (searchTerm) => {
  return [
    { userName: { $regex: searchTerm, $options: "i" } },
    { dealName: { $regex: searchTerm, $options: "i" } },
    { amount: { $regex: searchTerm, $options: "i" } },
  ];
};

export {
  getDatesSearchCondition,
  getUserSearchCondition,
  getDealSearchCondition,
  getInstallmentSearchCondition,
};
