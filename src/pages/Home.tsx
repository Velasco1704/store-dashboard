import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@api/apiSlice";
import { Nav } from "@components/Nav";
import { ProductsList } from "@components/lists/ProductsList";
import { StoreDetails } from "@components/StoreDetails";
import { NewCategoryModal } from "@components/modals/NewCategoryModal";
import { NewProductModal } from "@components/modals/NewProductModal";
import { CategoriesList } from "@components/lists/CategoriesList";
import { Loader } from "@components/Loader";
import styles from "@styles/Home.module.scss";

export const Home = () => {
  const [categoriesListState, setCategoriesListState] = useState(false);
  const [modalState, setModalState] = useState({
    category: false,
    product: false,
  });
  const { data: categoriesData, isLoading: categoriesLoader } =
    useGetCategoriesQuery(undefined);
  const { data: productsData, isLoading: productsLoader } =
    useGetProductsQuery(undefined);

  return (
    <div className={styles.home__container}>
      <Nav />
      {categoriesLoader || productsLoader ? (
        <div className={styles.home__container__loader}>
          <Loader />
        </div>
      ) : (
        <main>
          <StoreDetails
            categoriesData={categoriesData}
            productsData={productsData}
            modalState={modalState}
            setModalState={setModalState}
            setCategoriesListState={setCategoriesListState}
          />
          {categoriesListState && (
            <CategoriesList
              categoriesData={categoriesData}
              setCategoriesListState={setCategoriesListState}
            />
          )}
          <ProductsList productsData={productsData} />
        </main>
      )}
      {modalState.category && (
        <NewCategoryModal
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
      {modalState.product && (
        <NewProductModal
          categoriesData={categoriesData}
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
    </div>
  );
};
