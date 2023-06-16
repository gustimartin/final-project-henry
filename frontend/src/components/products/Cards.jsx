import Card from "./Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  filterByCategoryAndOrigin,
} from "../../features/productsSlice";
import { getAllCategories } from "../../features/categorySlice";
import InfiniteScroll from "react-infinite-scroll-component";
import BackToTop from "./BackToTop";
import SearchBar from "../NavBar/SearchBar";

function Cards() {
  const dispatch = useDispatch();
  const { allCategories: categories } = useSelector(
    (state) => state.categories
  );
  const { products } = useSelector((state) => state.products);

  const [itemsToShow, setItemsToShow] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handlerFilterByCategory = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    dispatch(filterByCategoryAndOrigin({ category, origin: selectedOrigin }));
  };

  const handlerFilterByOrigin = (e) => {
    const origin = e.target.value;
    setSelectedOrigin(origin);
    dispatch(filterByCategoryAndOrigin({ category: selectedCategory, origin }));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      const additionalItems = products.slice(itemsToShow, itemsToShow + 20);
      setItemsToShow(itemsToShow + additionalItems.length);
      if (itemsToShow >= products.length) {
        setHasMore(false);
      }
    }, 800);
  };

  const handleRefresh =(e)=>{
    e.preventDefault();
    dispatch(getAllProducts())
  }


  const displayedProducts = products.slice(0, itemsToShow);

  return (
    <div className="mt-5 mx-2">
      <div className="flex justify-between mb-5">
        <select
          className="border border-gray-300 rounded px-2 py-1"
          onChange={handlerFilterByCategory}
        >
          <option disabled selected defaultValue>
            Categories
          </option>
          <option value="All">All</option>
          {categories?.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <div className="flex items-center">
          <SearchBar />
          <button  className=" text-[#6b4014] py-2 px-4 rounded-md text-base cursor-pointer hover:bg-[#3f2319] hover:text-white" onClick={e=> {handleRefresh(e)}}>Refresh</button>
        </div>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          onChange={handlerFilterByOrigin}
        >
          <option disabled selected defaultValue>
            Origin
          </option>
          <option value="All">All</option>
          <option value="animal">Animal</option>
          <option value="plant">Plant</option>
        </select>
      </div>



      <div id="InfiniteScroll" className="">
        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>...</h4>}
        >
          <div className="grid space-x-2 grid-cols-3 gap-2 mt-5 mx-2 grid-rows-3">
            {displayedProducts?.length ? (
              displayedProducts
                .filter((product) => product.enable) // Filtrar solo los productos con enable en true
                .map((card) => (
                  <Card
                    key={card._id}
                    name={card.name}
                    image={card.image}
                    category={card.category[0]}
                    stock={card.stock}
                    description={card.description}
                    price={card.price}
                    id={card._id}
                  />
                ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </InfiniteScroll>
      </div>
      <BackToTop />
    </div>
  );
}

export default Cards;
