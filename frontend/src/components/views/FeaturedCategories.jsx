import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../../features/categorySlice";
import Slider from "react-slick";
import SliderCard from "./SliderCard";

function FeaturedCategories() {
  const dispatch = useDispatch();
  const { allCategories: categories } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
  };
  return (
    <div className=" m-6  ">
      <Slider {...settings}>
        {categories?.length
          ? categories.map((category) => (
              <SliderCard
                key={category.id}
                name={category.name}
                image={category.image}
              />
            ))
          : ''}
      </Slider>
    </div>
  );
}
export default FeaturedCategories;
