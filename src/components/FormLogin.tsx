import { useLoginMutation } from "@api/apiSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setToken } from "@features/userSlice";
import { useNavigate } from "react-router-dom";
import { BiSolidErrorAlt } from "react-icons/bi";
import { Loader } from "./Loader";
import styles from "@styles/forms/FormLogin.module.scss";

export const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data, isSuccess, isError, isLoading }] = useLoginMutation();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username: formState.username, password: formState.password });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isSuccess && !isError && data !== undefined) {
      dispatch(setToken(data));
      navigate("/");
    }
  }, [data, isSuccess, isError, dispatch, navigate]);

  return (
    <div className={styles.form__container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__container__inputs}>
          <input
            className={styles.form__input}
            autoComplete="off"
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <input
            className={styles.form__input}
            type="password"
            autoComplete="off"
            placeholder="******"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button className={styles.form__submit__button} type="submit">
          {isLoading ? <Loader /> : "Login"}
        </button>
      </form>
      {isError && (
        <div className={styles.form__error}>
          <span className={styles.form__error__span}>
            <BiSolidErrorAlt />
          </span>
          <p className={styles.form__error__p}>Invalid Credentials</p>
        </div>
      )}
    </div>
  );
};
