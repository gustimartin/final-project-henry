import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Star from "../Home/Stars";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormPublications = () => {
  const navigate = useNavigate();
  const rating = useSelector((state) => state.publication.rating);

  const [FormPublications, setFormPublications] = useState({
    description: "",
    score: rating,
  });

  useEffect(() => {
    setFormPublications((prevState) => ({
      ...prevState,
      score: rating,
    }));
  }, [rating]);

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setFormPublications((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/publications",
        FormPublications
      );
      toast.success("Thank you for youre review 🙂", {
        position: "bottom-left",
      }),
        navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full bg-cover bg-[url('/../bg4.jpg')]  bg-repeat ">
      <div
        className="justify-items-center
grid justify-self-stretch place-content-center
"
      >
        <form
          onSubmit={handleSubmit}
          className="justify-center block p-6 py-14 rounded-lg  shadow-xl max-w-2xl   mt-20 bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg "
        >
          <div className=" justify-center  flex-col  ">
            <h2 className=" font-bold text-5xl flex justify-center mb-6 text-yellow-900  ">
              Give us your feedback
            </h2>
          </div>

          <div className="form-group mb-6">
            <textarea
              value={FormPublications.description}
              onChange={handleInputChange}
              name="description"
              className="
    form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    bg-white bg-clip-padding
    border border-solid border-amber-50
    rounded
    
   
  "
              rows="2"
              placeholder="Help us help You!"
            ></textarea>
          </div>
          <div className="form-group  text-center mb-6"></div>
          <div className=" my-6">
            <Star {...rating} />
          </div>
          <button
            type="submit"
            className=" text-white cursor-pointer p-2 flex justify-center rounded-md shadow-md w-full bg-yellow-900 hover:bg-amber-800  mt-1 "
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
{
  /* <form onSubmit={handleSubmit}>
  <label>Opinion: </label>
  <input
    name="description"
    type="text"
    value={FormPublications.description}
    onChange={handleInputChange}
  />

  <label>Score: {rating} </label>

  <button type="submit">Post</button>
</form>; */
}
export default FormPublications;
