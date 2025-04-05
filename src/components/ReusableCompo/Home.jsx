import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faList, faPaperPlane , faClock , faCalendar } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function Home() {

    const apiKey = import.meta.env.VITE_BASE_URL;

  const [activeBtn, setActiveBtn] = useState();
  const [allOrganizerList, setOrganizerList] = useState([]);
  const [allPerformerList, setPerformerList] = useState([]);

  const navigate = useNavigate();


  useEffect(()=> {

      const storedData = localStorage.getItem('userInfo');
      const Info = JSON.parse(storedData).chooseTerm;
      
    
      Info === '1' ? setActiveBtn('performer') : setActiveBtn('organizer');
     
    } , [])


    useEffect(()=> {
        const getOrganizer = async () => {
            try {
              const result = await axios.get(`${apiKey}/organizers`);
       
              setOrganizerList(result.data.organizers);


              const res = await axios.get(`${apiKey}/performers`);
       
              setPerformerList(res.data.performers);


              

            } catch (err) {
              console.log(err);
            }
          };
          getOrganizer();

    },[])


  const handleBtnClick = (btn) => {
    setActiveBtn(btn);
  };





  return (
    <>
    <div className="flex justify-end">
      <button
        className={`${
            activeBtn === 'performer' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
        } py-2 px-4 rounded-l`}
        onClick={() => handleBtnClick('performer')}
        >
        Performer
      </button>
      <button
        className={`${
            activeBtn === 'organizer' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
        } py-2 px-4 rounded-r`}
        onClick={() => handleBtnClick('organizer')}
        >
        Organizer
      </button>
    </div>
{
activeBtn === "performer" &&(

    <>
   <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPerformerList.map((i) => (
          <div key={i._id} className="mb-4 cursor-pointer"  onClick={()=> navigate(`/pfm/profile/${i.userId}`)} >
            <div className="bg-white rounded-md border-1 shadow-md p-4">
              {/* Profile Picture */}
              <div className="mb-4 flex justify-center">
                <img
                  className="h-20 w-20 border-1 rounded-full object-cover"
                  src={i.image}
                  alt="Profile"
                />
              </div>
              {/* Details */}
              <div className="mb-2 flex justify-center">
                <span className="text-2xl font-bold">{i.username}</span>
              </div>
              <div className="mb-2 flex justify-center">
                <span className="text-md font-thin">{i.interest}</span>
              </div>
           
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
        )
}


{
activeBtn === "organizer" &&(

    <>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allOrganizerList.map((i) => (
          <div key={i._id} className="mb-4 cursor-pointer" onClick={()=> navigate(`/org/profile/${i.userId}`)}>
            <div className="bg-white  rounded-md shadow-md p-4">
              {/* Profile Picture */}
              <div className="mb-4 flex justify-center">
                <img
                  className="h-20 w-20 rounded-full border-1 object-cover"
                  src={i.image}
                  alt="Profile"
                />
              </div>
              {/* Details */}
              <div className="mb-2 flex justify-center">
                <span className="text-2xl font-bold">{i.username}</span>
                
              </div>
              <div className="mb-2 flex justify-center">
                <span className="text-md font-thin">{i.organizationName}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  </>
        )
}
          </>
  );
}

export default Home;
