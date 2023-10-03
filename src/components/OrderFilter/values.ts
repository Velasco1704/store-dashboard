export const ordersFilterValues = {
  SENT: "sent",
  NOT_SENT: "notSent",
  PAID: "paid",
  NOT_PAID: "notPiad",
  ALL: "all",
};

export const optionValues = [
  {
    value: ordersFilterValues.ALL,
    text: "All",
  },
  {
    value: ordersFilterValues.SENT,
    text: "Sent",
  },
  {
    value: ordersFilterValues.NOT_SENT,
    text: "Not Sent",
  },
  {
    value: ordersFilterValues.PAID,
    text: "Paid",
  },
  {
    value: ordersFilterValues.NOT_PAID,
    text: "Not Paid",
  },
];
