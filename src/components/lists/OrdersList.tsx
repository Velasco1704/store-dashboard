import { useEffect, useState } from "react";
import {
  useDeleteOrderNotPaidMutation,
  useUpdateOrderMutation,
} from "@api/apiSlice";
import { Loader } from "@components/Loader";
import { ClientInfoTable } from "@components/tables/ClientInfoTable";
import { OrderInfoTable } from "@components/tables/OrderInfoTable";
import { Order } from "@interfaces/order.interface";
import { BiSolidErrorAlt } from "react-icons/bi";
import styles from "@styles/lists/OrdersList.module.scss";

export const OrdersList = ({
  isLoading,
  ordersListFiltered,
}: {
  isLoading: boolean;
  ordersListFiltered: Order[];
}) => {
  const [error, setError] = useState(false);
  const [updateOrder, { isError }] = useUpdateOrderMutation();
  const [deleteOrderNotPaid] = useDeleteOrderNotPaidMutation();

  const handleOrderUpdate = (id: string, sent: boolean) => {
    updateOrder(sent ? { id, sent: false } : { id, sent: true });
  };

  const handleDeleteOrderNotPaid = (orderId: string) =>
    deleteOrderNotPaid(orderId);

  const handleError = () => {
    setError(true);
    setTimeout(() => setError(false), 3000);
  };

  useEffect(() => {
    isError && handleError();
  }, [isError]);

  if (isLoading)
    return (
      <div className={styles.ordersList__container__loader}>
        <Loader />
      </div>
    );

  if (ordersListFiltered?.length === 0)
    return (
      <div className={styles.ordersList__not__orders__container}>
        <h1 className={styles.ordersList__not__orders__container__h1}>
          There are not <span>Orders</span>
        </h1>
      </div>
    );

  return (
    <div className={styles.ordersList__container}>
      {ordersListFiltered.map((order) => (
        <div className={styles.ordersList__card} key={order.id}>
          <ClientInfoTable
            name={order.name}
            lastName={order.lastName}
            email={order.email}
            address={order.address}
          />
          <OrderInfoTable
            productName={order.product.name}
            amount={order.amount}
            paid={order.paid}
            sent={order.sent}
          />
          <div className={styles.ordersList__container__buttons}>
            <button
              className={`${styles.ordersList__button} ${
                !order.sent
                  ? styles.ordersList__sent__button
                  : styles.ordersList__not__sent__button
              }`}
              onClick={() => handleOrderUpdate(order.id, order.sent)}
              type="button"
            >
              {!order.sent ? "Sent" : "Not Sent"}
            </button>
            {!order.paid && (
              <button
                className={`${styles.ordersList__button} ${styles.ordersList__delete__button}`}
                onClick={() => handleDeleteOrderNotPaid(order.id)}
              >
                Delete
              </button>
            )}
          </div>
          {error && !order.paid && (
            <div className={styles.ordersList__container__alert__error}>
              <span className={styles.ordersList__error__span}>
                <BiSolidErrorAlt />
              </span>
              <p className={styles.ordersList__alert__error}>
                The order is not paid
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
