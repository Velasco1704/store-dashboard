import { Nav } from "@components/Nav";
import { OrdersList } from "@components/lists/OrdersList";
import { OrdersFilter } from "@components/OrderFilter";
import { useState } from "react";
import { ordersFilterValues } from "@components/OrderFilter/values";
import { useGetOrdersQuery } from "@api/apiSlice";
import { useFilterOrdersList } from "@hooks/useFilterOrdersList";

export const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery(undefined);
  const [filterState, setFilterState] = useState(ordersFilterValues.ALL);
  const ordersListFiltered = useFilterOrdersList(data ?? [], filterState);

  return (
    <section>
      <Nav />
      <OrdersFilter setFilterState={setFilterState} />
      <OrdersList
        isLoading={isLoading}
        ordersListFiltered={ordersListFiltered}
      />
    </section>
  );
};
