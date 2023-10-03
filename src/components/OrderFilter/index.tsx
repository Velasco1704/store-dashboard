import { optionValues } from "./values";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ordersFilterValues } from "./values";
import styles from "@styles/OrdersFilter.module.scss";

export const OrdersFilter = ({
  setFilterState,
}: {
  setFilterState: (value: string) => void;
}) => {
  return (
    <div className={styles.ordersFilter}>
      <div className={styles.ordersFilter__container__select}>
        <span className={styles.ordersFilter__icon}>
          <MdOutlineKeyboardArrowDown />
        </span>
        <select
          className={styles.ordersFilter__select}
          defaultValue={ordersFilterValues.ALL}
          onChange={({ target }) => setFilterState(target.value)}
        >
          {optionValues.map((option) => (
            <option
              key={option.value}
              className={styles.ordersFilter__option}
              value={option.value}
            >
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
