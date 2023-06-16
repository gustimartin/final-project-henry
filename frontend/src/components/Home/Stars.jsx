import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { setRating } from "../../features/PublicationsSlice";
import { useSelector, useDispatch } from "react-redux";

const Star = () => {
  const [hover, setHover] = useState(null);
  const rating = useSelector((state) => state.publication.rating);
  const dispatch = useDispatch();

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => dispatch(setRating(ratingValue))}
              className="opacity-0 absolute h-0 w-0"
            />
            <FaStar
              size={40}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Star;
