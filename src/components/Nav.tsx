import logo from "@assets/logo.png";
import { deleteToken } from "@features/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "@styles/Nav.module.scss";

export const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(deleteToken());
    navigate("/login");
  };

  return (
    <header className={styles.nav__header}>
      <nav className={styles.nav}>
        <Link className={styles.nav__link} to="/">
          <img className={styles.nav__img} src={logo} alt="logo" />
        </Link>
      </nav>
      <button className={styles.nav__logOut} onClick={handleLogOut}>
        Log Out
      </button>
    </header>
  );
};
