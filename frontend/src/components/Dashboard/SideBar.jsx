import { Link } from "react-router-dom";
import { RiDashboardLine, RiStore3Fill, RiFolderUserLine } from "react-icons/ri";
const SideBar = () => {
    return (
      <div className="min-h-screen">

       <div className=" p-8">
        <div className=" text-ceneter p-8 ">
          <h1 className="uppercase font-bold tracking-[4px]">The Clean Plate</h1>
        </div>
        <nav>
          <ul>
            <li>
            <Link to="/Dashboard">
            <div className="flex items-center gap-4 text-gray-500 hover:bg-yellow-200 p-4 hover:text-black rounded-lg transition-colors">
              <RiDashboardLine/>
              Orders
            </div>
          </Link>
            </li>
            <li>
            <Link to="/Dashboard/products">
            <div className="flex items-center gap-4 text-gray-500 hover:bg-yellow-200 p-4 hover:text-black rounded-lg transition-colors">
              <RiStore3Fill/>
              Products
            </div>
          </Link>
            </li>
            <li>
            <Link to="/Dashboard/Users">
            <div className="flex items-center gap-4 text-gray-500 hover:bg-yellow-200 p-4 hover:text-black rounded-lg transition-colors">
              <RiFolderUserLine/>
              Users
            </div>
          </Link>
            </li>
          </ul>
        </nav>
       </div>
      </div>
    );
  };
  
  export default SideBar;