import Slider from "react-slick";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../features/productsSlice";

function RelaitedProducts({ ...item }) {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
  };
  let prod = "";
  const itemRealValue = item.item;
  let itemValue = "";
  for (let i = 0; i < itemRealValue?.length; i++) {
    itemValue = itemRealValue[i];
  }
  // for (let i = 0; i < prod.length; i++) {}
  prod = products.filter((el) => el.category[0] === itemValue);

  return (
    <div className="">
      <Slider {...settings}>
        {prod?.length ? (
          prod
            .filter((product) => product.enable)
            .map((card) => (
              <Card
                key={card._id}
                name={card.name}
                image={card.image}
                category={card.category[0]}
                stock={card.stock}
                enable={card.enable}
                description={card.description}
                price={card.price}
                id={card._id}
              />
            ))
        ) : (
          <p>No products found.</p>
        )}
      </Slider>
    </div>
  );
}

export default RelaitedProducts;
