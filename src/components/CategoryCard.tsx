import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@api/apiSlice";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import styles from "@styles/CategoryCard.module.scss";

export const CategoryCard = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isSuccess }] = useUpdateCategoryMutation();
  const [editState, setEditState] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState(categoryName);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCategory({
      id: categoryId,
      newCategoryName: categoryNameInput,
    });
  };

  useEffect(() => {
    isSuccess && setEditState(false);
  }, [isSuccess, setEditState]);

  return (
    <div className={styles.categoryCard__container}>
      <form className={styles.categoryCard__form} onSubmit={handleSubmit}>
        <input
          className={styles.categoryCard__form__input}
          onChange={({ target }) => setCategoryNameInput(target.value)}
          type="text"
          autoComplete="off"
          value={categoryNameInput}
          readOnly={editState === false}
          required
          id="name"
          placeholder="name"
        />
        {editState && (
          <button
            className={styles.categoryCard__form__save__button}
            type="submit"
          >
            <BsCheckLg />
          </button>
        )}
      </form>
      <div className={styles.categoryCard__buttons}>
        <button
          className={`${styles.categoryCard__button} ${
            !editState
              ? styles.categoryCard__edit__button
              : styles.categoryCard__cancel__button
          }`}
          type="button"
          onClick={() => setEditState(!editState)}
        >
          {editState === false ? "Edit" : "Cancel"}
        </button>
        <button
          className={`${styles.categoryCard__button} ${styles.categoryCard__delete__button}`}
          type="button"
          onClick={() => deleteCategory(categoryId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
