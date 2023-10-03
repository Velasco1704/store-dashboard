import { useGetCategoriesQuery, useUpdateProductMutation } from "@api/apiSlice";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiSolidErrorAlt } from "react-icons/bi";
import { Loader } from "@components/Loader";
import { BackgroundModal } from "@Layout/BackgroundModal";
import styles from "@styles/forms/FormProduct.module.scss";

export const UpdateProductModal = ({
  productValues,
  setEditState,
}: {
  setEditState: (value: boolean) => void;
  productValues: {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    image: FileList | string;
  };
}) => {
  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const [updateProduct, { isSuccess, isError, isLoading }] =
    useUpdateProductMutation();
  const [formState, setFormState] = useState<{
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    image: FileList | string;
  }>({
    name: productValues.name,
    price: productValues.price,
    stock: productValues.stock,
    categoryId: productValues.categoryId,
    image: productValues.image,
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("price", formState.price.toString());
    formData.append("stock", formState.stock.toString());
    formData.append("categoryId", formState.categoryId);

    if (typeof formState.image !== "string")
      formData.append("image", formState.image[0]);

    updateProduct({ id: productValues.id, formData });
  };

  useEffect(() => {
    isSuccess && setEditState(false);
  }, [isSuccess, setEditState]);

  return (
    <BackgroundModal>
      <form className={styles.formProduct__form} onSubmit={handleSubmit}>
        <input
          className={styles.formProduct__form__input}
          onChange={({ target }) =>
            setFormState({ ...formState, name: target.value })
          }
          value={formState.name}
          name="name"
          autoComplete="off"
          placeholder="name"
          type="text"
        />
        <input
          className={styles.formProduct__form__input}
          onChange={({ target }) =>
            setFormState({ ...formState, price: +target.value })
          }
          value={formState.price}
          type="number"
          autoComplete="off"
          name="price"
          placeholder="price"
        />
        <input
          className={styles.formProduct__form__input}
          onChange={({ target }) =>
            setFormState({ ...formState, stock: +target.value })
          }
          value={formState.stock}
          type="number"
          autoComplete="off"
          name="stock"
          placeholder="Stock"
        />
        <div className={styles.formProduct__form__select__container}>
          <span className={styles.formProduct__form__icon}>
            <MdOutlineKeyboardArrowDown />
          </span>
          <select
            className={styles.formProduct__form__select}
            onChange={({ target }) =>
              setFormState({
                ...formState,
                categoryId: target.value,
              })
            }
            defaultValue={formState.categoryId}
            name="categoryId"
            id="categoryId"
          >
            {categoriesData?.map((category) => (
              <option
                className={styles.formProduct__form__option}
                value={category.id}
                key={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className={styles.formProduct__form__add__image__button}
          type="button"
        >
          <label
            className={styles.formProduct__form__label}
            htmlFor="update-btn-file"
          >
            Change Image
          </label>
          <input
            className={styles.formProduct__form__file}
            onChange={({ target }) =>
              setFormState({ ...formState, image: target.files! })
            }
            type="file"
            name="image"
            id="update-btn-file"
          />
        </button>
        {typeof formState.image === "string" ? (
          <img
            className={styles.formProduct__form__img}
            src={productValues.image as string}
            alt="image"
          />
        ) : (
          <img
            className={styles.formProduct__form__img}
            src={URL.createObjectURL(formState.image[0] as Blob)}
          />
        )}
        <div className={styles.formProduct__form__buttons}>
          <button
            className={`${styles.formProduct__form__button} ${styles.formProduct__form__save__button}`}
            type="submit"
          >
            {isLoading ? <Loader /> : "save"}
          </button>
          <button
            className={`${styles.formProduct__form__button} ${styles.formProduct__form__close__button}`}
            onClick={() => setEditState(false)}
            type="button"
          >
            cancel
          </button>
        </div>
        {isError && (
          <div className={styles.formProduct__form__error}>
            <span className={styles.formProduct__form__error__span}>
              <BiSolidErrorAlt />
            </span>
            <p className={styles.formProduct__form__error__p}>
              Invalid Credentials
            </p>
          </div>
        )}
      </form>
    </BackgroundModal>
  );
};
