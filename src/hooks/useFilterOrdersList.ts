import { Order } from "@interfaces/order.interface";
import { ordersFilterValues } from "@components/OrderFilter/values";

export const useFilterOrdersList = (data: Order[], filter: string): Order[] =>
  data.filter((order) => {
    if (filter === ordersFilterValues.NOT_SENT) {
      return order.sent === false;
    } else if (filter === ordersFilterValues.SENT) {
      return order.sent === true;
    } else if (filter === ordersFilterValues.NOT_PAID) {
      return order.paid === false;
    } else if (filter === ordersFilterValues.PAID) {
      return order.paid === true;
    } else if (filter === ordersFilterValues.ALL) {
      return order;
    } else {
      return order;
    }
  });
