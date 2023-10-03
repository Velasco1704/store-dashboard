import { useDeleteProductMutation } from "@api/apiSlice";
import { Product } from "@interfaces/product.interface";
import { useState } from "react";
import { UpdateProductModal } from "../modals/UpdateProductModal";
import styles from "@styles/lists/ProductsList.module.scss";

export const ProductsList = ({
  productsData,
}: {
  productsData: Product[] | undefined;
}) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [editState, setEditState] = useState(false);
  const [productValues, setProductValues] = useState<{
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    image: FileList | string;
  }>({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    image: "",
  });

  if (productsData?.length === 0)
    return (
      <section className={styles.productsList__not__products__container}>
        <h1 className={styles.productsList__not__products__container__h1}>
          There are not <span>Products</span>
        </h1>
      </section>
    );

  return (
    <section className={styles.productsList__section}>
      {productsData?.map((item) => (
        <div className={styles.productsList__product} key={item.id}>
          <img
            className={styles.productsList__product__img}
            src={item.image}
            alt={item.name}
          />
          <div className={styles.productsList__product__info}>
            <p className={styles.productsList__product__info__p}>
              <span className={styles.productsList__product__info__span}>
                Name:
              </span>{" "}
              {item.name}
            </p>
            <p className={styles.productsList__product__info__p}>
              <span className={styles.productsList__product__info__span}>
                Category:
              </span>{" "}
              {item.category.name}
            </p>
            <p className={styles.productsList__product__info__p}>
              <span className={styles.productsList__product__info__span}>
                Price:
              </span>{" "}
              {item.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className={styles.productsList__product__info__p}>
              <span className={styles.productsList__product__info__span}>
                Stock:
              </span>{" "}
              {item.stock}
            </p>
          </div>
          <div className={styles.productsList__product__buttons}>
            <button
              className={`${styles.productsList__product____edit__button} ${styles.productsList__product__button}`}
              onClick={() => {
                setEditState(true);
                setProductValues({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  stock: item.stock,
                  categoryId: item.category.id,
                  image: item.image,
                });
              }}
            >
              Edit
            </button>
            <button
              className={`${styles.productsList__product__delete__button} ${styles.productsList__product__button}`}
              onClick={() => deleteProduct(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {editState && (
        <UpdateProductModal
          productValues={productValues}
          setEditState={setEditState}
        />
      )}
    </section>
  );
};
