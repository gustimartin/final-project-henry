import { Link } from "react-router-dom";

function Category({ name, id, image }) {
  return (
    <div className="  rounded-lg relative transition-all duration-200 cursor-pointer filter grayscale hover:grayscale-0 ">
      <Link to={`/categories/${name.toLowerCase()}`}>
        <img
          src={image}
          alt="image"
          className="object-cover object-center h-40 w-full rounded-lg absolute mix-blend-overlay opacity-90  "
        />
        <h1 className=" text-5xl p-16  text-center font-bold text-yellow-950">
          {name}
        </h1>
      </Link>
    </div>
  );
}

export default Category;
