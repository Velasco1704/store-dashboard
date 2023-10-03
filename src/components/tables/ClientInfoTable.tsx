import styles from "@styles/Tables.module.scss";

export const ClientInfoTable = ({
  name,
  lastName,
  email,
  address,
}: {
  name: string;
  lastName: string;
  email: string;
  address: string;
}) => {
  return (
    <table className={styles.table__container}>
      <caption className={styles.table__caption}>Client Info</caption>
      <tbody className={styles.table__tbody}>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Name</th>
          <td className={styles.table__td}>{name}</td>
        </tr>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Last Name</th>
          <td className={styles.table__td}>{lastName}</td>
        </tr>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Email</th>
          <td className={styles.table__td}>{email}</td>
        </tr>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Address</th>
          <td className={styles.table__td}>{address}</td>
        </tr>
      </tbody>
    </table>
  );
};
