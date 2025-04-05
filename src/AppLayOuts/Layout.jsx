import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faCalendar, faPortrait, faBars } from '@fortawesome/free-solid-svg-icons';

function Layout() {
  const storedData = localStorage.getItem('userInfo');
  const Info = JSON.parse(storedData).chooseTerm;
  const profileId = JSON.parse(storedData).id;



  const profile = term => {
    return term === '1' ? 'org' : 'pfm';
  };


  const [openMorePopUp ,setOpenMorePopUp] = useState()

  const navigate = useNavigate();



  const handleClick= ()=> {
    setOpenMorePopUp(true)
  }
 
  return (
    <div className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:grid sm:grid-cols-12 ">
    {/* Sidebar */}
    <ul className="lg:col-span-2 p-3 fixed inset-y-0 sideNav left-0 z-50 bg-white shadow-sm overflow-y-auto">
      <div className="mb-5">
        <span className="text-2xl font-bold">StageSync</span>
      </div>
      <li onClick={()=> navigate(`/${profile(Info)}`)} >
          <FontAwesomeIcon icon={faHouse} /> Home
      </li>
      <li onClick={()=> navigate(`/${profile(Info)}/search`)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
      </li>
      {Info === '1' && (
        <li onClick={()=> navigate(`/${profile(Info)}/createSchedule/${profileId}`)}>
            <FontAwesomeIcon icon={faCalendar} /> Create Schedule
        </li>
      )}
      <li onClick={()=> navigate(`/${profile(Info)}/profile/${profileId}`)}>
          <FontAwesomeIcon icon={faPortrait} /> Profile
      </li>
      
      <li onClick={()=> navigate(`/${profile(Info)}/more/${profileId}`)} >
        <span className="sideBarFont">
          <FontAwesomeIcon icon={faBars} /> More
        </span>
   
      </li>
    </ul>
    {/* Main Content */}
    <div className="lg:col-span-10 lg:col-start-3 md:col-span-10 md:col-start-3">
      <div className="layout">
        <Outlet />
      </div>
    </div>
  </div>
  
  );
}

export default Layout;
