import { Link } from "react-router-dom";

function SliderCard({ name, image }) {
  return (
    <div className="  border border-gray-200 rounded-lg shadow bg-opacity-30 mx-1 bg-yellow-900  ">
      <img className="rounded-t-lg  h-64 w-full " src={image} alt={name} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold  text-yellow-900 ">{name}</h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <Link to={`/categories/${name.toLowerCase()}`}>
          <button
            className="text-white cursor-pointer p-2 flex justify-center
          rounded-md shadow-md w-full bg-yellow-900 hover:bg-amber-800 mt-1"
          >
            {" "}
            See More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SliderCard;
