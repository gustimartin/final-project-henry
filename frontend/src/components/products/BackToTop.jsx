import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
function BackToTop() {
  const [backToTop, setbackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setbackToTop(true);
      } else {
        setbackToTop(false);
      }
    });
  });

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTop && (
        <button onClick={scrollUp} className=" fixed bottom-12 right-12   ">
          <BsFillArrowUpCircleFill className="   text-black text-7xl" />
          <p>back to top</p>
        </button>
      )}
    </div>
  );
}

export default BackToTop;
