import { Category } from "@interfaces/category.interface";
import { CategoryCard } from "./CategoryCard";
import { RxCross1 } from "react-icons/rx";
import { BackgroundModal } from "../Layout/BackgroundModal";
import styles from "@styles/CategoriesList.module.scss";

export const CategoriesList = ({
  categoriesData,
  setCategoriesListState,
}: {
  categoriesData: Category[] | undefined;
  setCategoriesListState: (value: boolean) => void;
}) => {
  return (
    <BackgroundModal>
      <div className={styles.categoriesList__container}>
        {categoriesData
          ?.filter((category) => category.name !== "General")
          .map((category) => (
            <CategoryCard
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
            />
          ))}
        <button
          className={styles.categoriesList__container__cross__button}
          onClick={() => setCategoriesListState(false)}
        >
          <RxCross1 />
        </button>
      </div>
    </BackgroundModal>
  );
};
