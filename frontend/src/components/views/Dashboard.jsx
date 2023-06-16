import SideBar from "../Dashboard/SideBar";
import OrderDashboard from '../Dashboard/Order'

const Dashboard = () => {

    return (
      <div className="grid grid-cols-6">
          <SideBar/>
          <div className="col-span-5 bg-yellow-200 w-100 h-100 " >

          <OrderDashboard/>





          </div>
      </div>
    );
  };
  
  export default Dashboard;