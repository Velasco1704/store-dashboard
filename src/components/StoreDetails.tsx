import { Category } from "@interfaces/category.interface";
import { Product } from "@interfaces/product.interface";
import styles from "@styles/StoreDetails.module.scss";

export const StoreDetails = ({
  categoriesData,
  productsData,
  modalState,
  setModalState,
  setCategoriesListState,
}: {
  categoriesData: Category[] | undefined;
  productsData: Product[] | undefined;
  modalState: { category: boolean; product: boolean };
  setModalState: (value: { category: boolean; product: boolean }) => void;
  setCategoriesListState: (value: boolean) => void;
}) => {
  return (
    <section className={styles.storeDetails__section}>
      <div className={styles.storeDetails__info}>
        <p className={styles.storeDetails__info__counters__text}>
          Total of Categories:{" "}
          <span className={styles.storeDetails__info__counters__span}>
            {categoriesData?.length}
          </span>
        </p>
        <p className={styles.storeDetails__info__counters__text}>
          Total of Products:{" "}
          <span className={styles.storeDetails__info__counters__span}>
            {productsData?.length}
          </span>
        </p>
      </div>
      <div className={styles.storeDetails__buttons}>
        <div className={styles.storeDetails__category__buttons}>
          <button
            className={`${styles.storeDetails__category__button} ${styles.buttons_hover}`}
            onClick={() => setCategoriesListState(true)}
          >
            See Categories
          </button>
          <button
            className={`${styles.storeDetails__category__button} ${styles.buttons_hover}`}
            onClick={() => setModalState({ ...modalState, category: true })}
          >
            New Category
          </button>
        </div>
        <button
          className={`${styles.storeDetails__product__button} ${styles.buttons_hover}`}
          onClick={() => setModalState({ ...modalState, product: true })}
        >
          New Product
        </button>
      </div>
    </section>
  );
};
