import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
const Publications = () => {
  const [publications, setPublications] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    vertical: true,
    verticalSwiping: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/publications");
        const data = response.data;
        setPublications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // console.log(publications);

  return (
    <div className=" mb-6">
      <Slider {...settings}>
        {publications &&
          publications.map((p) => (
            <div
              key={p.id}
              className="w-full  text-center  border text-white rounded-lg shadow p-6 bg-yellow-900 "
            >
              <p className="mb-5 text-xl ">{p.description}</p>
              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-xl">
                Review: {p.score}/5
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Publications;
