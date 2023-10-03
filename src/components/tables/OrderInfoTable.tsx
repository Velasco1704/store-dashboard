import styles from "@styles/Tables.module.scss";

export const OrderInfoTable = ({
  productName,
  amount,
  paid,
  sent,
}: {
  productName: string;
  amount: number;
  paid: boolean;
  sent: boolean;
}) => {
  return (
    <table className={styles.table__container}>
      <caption className={styles.table__caption}>Order Info</caption>
      <tbody className={styles.table__tbody}>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Product Name</th>
          <td className={styles.table__td}>{productName}</td>
        </tr>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Amount</th>
          <td className={styles.table__td}>{amount}</td>
        </tr>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Paid</th>
          <td className={styles.table__td}>{paid ? "Yes" : "No"}</td>
        </tr>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Sent</th>
          <td className={styles.table__td}>{sent ? "Yes" : "No"}</td>
        </tr>
      </tbody>
    </table>
  );
};
