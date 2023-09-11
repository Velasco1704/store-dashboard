import styles from "@styles/Layout.module.scss";

export const BackgroundModal = ({ children }: { children: JSX.Element }) => (
  <section className={styles.layout}>{children}</section>
);
