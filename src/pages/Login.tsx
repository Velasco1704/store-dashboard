import { FormLogin } from "@components/FormLogin";
import styles from "@styles/Login.module.scss";

export const Login = () => {
  return (
    <section className={styles.login__container}>
      <h1 className={styles.login__h1}>Login</h1>
      <FormLogin />
    </section>
  );
};
