import { Link } from "react-router-dom";
import JsLogo from "../../assets/icons/JsLogo";
import ReactLogo from "../../assets/icons/ReactLogo";
import NodeLogo from "../../assets/icons/NodeLogo";
import ReduxLogo from "../../assets/icons/ReduxLogo";
import ExpressLogo from "../../assets/icons/ExpressLogo";
import MongoLogo from "../../assets/icons/MongoLogo";
import StripeLogo from "../../assets/icons/StripeLogo";
import TailwindLogo from "../../assets/icons/TailwindLogo";

const About = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="w-8/12 p-8 bg-white rounded-lg shadow-lg ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About us</h1>
          <p className="text-gray-700 leading-loose">
            The Clean Plate is a dietetic committed to promoting healthy eating
            habits. Our passionate team carefully selects fresh and nutritious
            ingredients to create delicious and healthy options. We focus on
            offering alternatives tailored to your dietary needs, providing
            transparency in nutritional values.
          </p>
          <p className="text-gray-700 mt-4 leading-loose">
            We are part of a programming project in the Soy Henry course, where
            we apply our skills to develop an innovative platform. We use
            technology to facilitate access to our products and provide
            efficient service.
          </p>
          <p className="text-gray-700 mt-4 leading-loose">
            Join our community of healthy food enthusiasts and let us be your
            guide on this journey to a healthier life. We are here to support
            you every step of the way.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              to="/contact"
              className="bg-yellow-950 hover:bg-yellow-900 text-yellow-400  py-2 px-4 rounded "
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <div className="w-8/12 p-8 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Used Technologies</h2>
        <ul className="flex items-center space-x-4">
          <li className="ml-2 flex items-center">
            <JsLogo />
            <span className="text-gray-700">JavaScript</span>
          </li>
          <li className="flex items-center">
            <ReactLogo/>
            <span className="text-gray-700">React</span>
          </li>
          <li className="flex items-center">
            <ReduxLogo/>
            <span className="text-gray-700">Redux</span>
          </li>
          <li className="flex items-center">
           <NodeLogo/>
            <span className="text-gray-700">NodeJS</span>
          </li>
          <li className="flex items-center">
            <ExpressLogo/>
            <span className="text-gray-700">Express</span>
          </li>
          <li className="flex items-center">
            <MongoLogo/>
            <span className="text-gray-700">MongoDB</span>
          </li>
          <li className="flex items-center">
            <StripeLogo/>
            <span className="text-gray-700">Stripe</span>
          </li>
          <li className="flex items-center">
            <TailwindLogo/>
            <span className="text-gray-700">Tailwind CSS</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;