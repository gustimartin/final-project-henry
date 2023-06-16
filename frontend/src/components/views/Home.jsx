import FeaturedCategories from "./FeaturedCategories";
import Publications from "../Publications/Publications";

const Home = () => {
  return (
    <div className="  w-full h-full bg-amber-50">
      
        <div className=" flex flex-col mt-1 py-10 bg-opacity-20 bg-cover bg-[url('/../oats.jpg')]  bg-center h-">
          <h1 className=" text-8xl justify-start ml-2 font-bold text-yellow-100 ">
            The Clean Plate
          </h1>
          <h3 className=" justify-center items-center self-center  text-6xl mt-4 font-semibold text-yellow-800">
            Eat well, live better.
          </h3>
        </div>
        <div>
          <FeaturedCategories />
        </div>

        <div>
          <h2>
            
          </h2>
        </div>

        <div className=" flex-col pt-4">
          <h1 className=" text-4xl text-yellow-900 font-semibold my-6 mt-8   justify-center   flex">
            Customer expierences
          </h1>
          <Publications />
        </div>
      
    </div>
  );
};

export default Home;
