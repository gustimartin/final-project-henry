import React, { useEffect } from 'react';
import axios from 'axios';
import { setFilteredUsers } from '../../features/userSlice';
import { useSelector, useDispatch } from "react-redux";
import SideBar from './SideBar';
import Swal from "sweetalert2"


const UsersDashboard = () => {
  const filteredUsers = useSelector((state) => state.user.filteredUsers);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/auth/");
        const users = response.data;
        const filterUsers = users
        dispatch(setFilteredUsers(filterUsers));

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filteredUsers]);




  const handleBlock = async (id) => {

    try {

      await axios.patch(`/auth/${id}`, { enable: false });
      const response = await axios.get("/auth/");
      const users = response.data;
      const filterUsers = users
      await dispatch(setFilteredUsers(filterUsers));

      Swal.fire({
        icon: 'success',
        title: 'User has been blocked',

      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnlock = async (id) => {

    try {

      await axios.patch(`/auth/${id}`, { enable: true });
      const response = await axios.get("/auth/");
      const users = response.data;
      const filterUsers = users

      await dispatch(setFilteredUsers(filterUsers));

      Swal.fire({
        icon: 'warning',
        title: 'User has been unlocked',

      })

    } catch (error) {
      console.error(error);
    }


  }

  return (
    <div className="grid grid-cols-6">
      <SideBar />
      <div className="grid space-x-2 grid-cols-3 col-span-5 gap-2 mt-5 mx-2 grid-rows-3 bg-yellow-200">
        {filteredUsers &&
          filteredUsers.map((u) => (
            <div
              key={u._id}
              className={`border  border-yellow-400 p-4 mb-4 ${u.enable ? '' : 'opacity-50'
                }`}
            >
              <p className="font-bold">Username: {u.username}</p>
              <p>Roles: {u.roles.map((r) => r.name)}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleBlock(u._id)}
                >
                  Block
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleUnlock(u._id)}
                >
                  Unlock
                </button>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
};

export default UsersDashboard;
