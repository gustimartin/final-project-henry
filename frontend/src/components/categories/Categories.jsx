import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
// import { useGetCategoriesQuery } from "../../features/productsApi";
import { useEffect } from "react";
import { getAllCategories } from "../../features/categorySlice";

function Categories() {
  const dispatch = useDispatch();
  const { allCategories: categories } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  // const { data: categories } = useGetCategoriesQuery();
  return (
    <div className=" grid grid-cols-3 gap-3 mt-5 mx-3 ">
      {categories?.length
        ? categories.map((category) => (
            <div key={category.id}>
              <Category name={category.name} image={category.image} />
            </div>
          ))
        : console.log(categories)}
    </div>
  );
}

export default Categories;
