import { useCreateCategoryMutation } from "@api/apiSlice";
import { useEffect, useState } from "react";
import { BackgroundModal } from "@Layout/BackgroundModal";
import styles from "@styles/NewCategoryModal.module.scss";
import { Loader } from "@components/Loader";

export const NewCategoryModal = ({
  modalState,
  setModalState,
}: {
  modalState: { category: boolean; product: boolean };
  setModalState: (value: { category: boolean; product: boolean }) => void;
}) => {
  const [newCategory, { isSuccess, isLoading }] = useCreateCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    newCategory(categoryName);
  };

  useEffect(() => {
    isSuccess && setModalState({ ...modalState, category: false });
  }, [isSuccess, modalState, setModalState]);

  return (
    <BackgroundModal>
      <form className={styles.newCategoryModal__form} onSubmit={handleSubmit}>
        <input
          className={styles.newCategoryModal__form__input}
          onChange={({ target }) => setCategoryName(target.value)}
          required
          autoComplete="off"
          type="text"
          id="name"
          placeholder="Name"
        />
        <div className={styles.newCategoryModal__form__container__buttons}>
          <button
            className={`${styles.newCategoryModal__form__buttons} ${styles.newCategoryModal__form__save__button}`}
            type="submit"
          >
            {!isLoading ? "Save" : <Loader />}
          </button>
          <button
            className={`${styles.newCategoryModal__form__buttons} ${styles.newCategoryModal__form__close__button}`}
            onClick={() => setModalState({ ...modalState, category: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </BackgroundModal>
  );
};
