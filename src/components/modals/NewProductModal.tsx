import { useEffect, useState } from "react";
import { Category } from "@interfaces/category.interface";
import { useCreateProductMutation } from "@api/apiSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiSolidErrorAlt } from "react-icons/bi";
import defaultImage from "@assets/default-image.jpg";
import { Loader } from "@components/Loader";
import { BackgroundModal } from "@Layout/BackgroundModal";
import styles from "@styles/forms/FormProduct.module.scss";

export const NewProductModal = ({
  categoriesData,
  modalState,
  setModalState,
}: {
  categoriesData: Category[] | undefined;
  modalState: { category: boolean; product: boolean };
  setModalState: (value: { category: boolean; product: boolean }) => void;
}) => {
  const [error, setError] = useState(false);
  const [newProduct, { isError, isSuccess, isLoading }] =
    useCreateProductMutation();
  const [formState, setFormState] = useState<{
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    image: FileList | string;
  }>({
    name: "",
    price: 0,
    stock: 0,
    categoryId:
      categoriesData
        ?.filter((category) => category.name === "General")[0]
        .id.toString() ?? "",
    image: "",
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.price <= 0 || formState.stock <= 0) {
      setError(true);
    } else {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("price", formState.price.toString());
      formData.append("stock", formState.stock.toString());
      formData.append("categoryId", formState.categoryId);
      formData.append("image", formState.image[0]);
      newProduct(formData);
    }
  };

  useEffect(() => {
    isSuccess && setModalState({ ...modalState, product: false });
  }, [isSuccess, modalState, setModalState]);
  return (
    <BackgroundModal>
      <form className={styles.formProduct__form} onSubmit={handleSubmit}>
        <input
          className={styles.formProduct__form__input}
          onChange={({ target }) =>
            setFormState({ ...formState, name: target.value })
          }
          required
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className={styles.formProduct__form__input}
          onChange={({ target }) =>
            setFormState({ ...formState, price: +target.value })
          }
          required
          autoComplete="off"
          type="number"
          name="price"
          placeholder="Price"
        />
        <input
          className={styles.formProduct__form__input}
          onChange={({ target }) =>
            setFormState({ ...formState, stock: +target.value })
          }
          required
          autoComplete="off"
          type="number"
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
            required
            defaultValue={categoriesData
              ?.filter((category) => category.name === "General")[0]
              .id.toString()}
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
          type="button"
          className={styles.formProduct__form__add__image__button}
        >
          <label className={styles.formProduct__form__label} htmlFor="btn-file">
            {formState.image !== "" ? "Change Image" : "Add Image"}
          </label>
          <input
            className={styles.formProduct__form__file}
            onChange={({ target }) =>
              setFormState({ ...formState, image: target.files! })
            }
            type="file"
            name="image"
            id="btn-file"
          />
        </button>
        {formState.image !== "" ? (
          <img
            className={styles.formProduct__form__img}
            src={URL.createObjectURL(formState.image[0] as Blob)}
          />
        ) : (
          <img
            className={styles.formProduct__form__img}
            src={defaultImage}
            alt="image"
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
            onClick={() => setModalState({ ...modalState, product: false })}
          >
            cancel
          </button>
        </div>
        {isError ||
          (error && (
            <div className={styles.formProduct__form__error}>
              <span className={styles.formProduct__form__error__span}>
                <BiSolidErrorAlt />
              </span>
              <p className={styles.formProduct__form__error__p}>
                Invalid Credentials
              </p>
            </div>
          ))}
      </form>
    </BackgroundModal>
  );
};
