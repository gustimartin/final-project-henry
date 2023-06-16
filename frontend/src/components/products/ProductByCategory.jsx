import { useParams } from "react-router-dom";
import Card from "./Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/productsSlice";

function ProductByCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const fil = products?.filter((el) => el.category[0].toLowerCase() == id);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className=" grid grid-cols-3 gap-1 mt-5 mx-2 grid-rows-3">
      {fil?.length
        ? fil
            .filter((product) => product.enable)
            .map((cat) => (
              <ul key={cat._id}>
                <Card
                  name={cat.name}
                  image={cat.image}
                  category={cat.category[0]}
                  stock={cat.stock}
                  enable={cat.enable}
                  description={cat.description}
                  price={cat.price}
                  id={cat._id}
                />
              </ul>
            ))
        : ''}
    </div>
  );
}

export default ProductByCategory;
