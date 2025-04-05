import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faList , faUserGraduate, faGuitar, faEnvelope,faPhone , faPaperPlane , faClock , faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function ORGSearch() {
    const apiKey = import.meta.env.VITE_BASE_URL;
    const [allPerformerList, setPerformerList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
  
    useEffect(() => {
      const getUserById = async () => {
        try {
          const result = await axios.get(`${apiKey}/performers`);
        //   setPerformerList(result.data.data);
        setPerformerList(result.data.performers);
        } catch (err) {
          console.log(err);
        }
      };
      getUserById();
    }, []);

    console.log(allPerformerList);
  
    const filteredList = allPerformerList.filter(i => {
      const searchTermLower = searchTerm.toLowerCase();
 
      return (
        (i.username && i.username.toLowerCase().includes(searchTermLower)) ||
        (i.email && i.email.toLowerCase().includes(searchTermLower)) ||
        (i.phoneNo && i.phoneNo.toLowerCase().includes(searchTermLower)) ||
        (i.qualification && i.qualification.toLowerCase().includes(searchTermLower)) ||
        (i.interest && i.interest.toLowerCase().includes(searchTermLower)) 
     
      );
    });






  return (
    <div className="container mx-auto p-4">
      <div className="container mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map(i => (
          <div key={i._id} className="mb-4 cursor-pointer" onClick={()=> navigate(`/org/pfm/profile/${i.userId}`)}>
            <div className="bg-white rounded-md shadow-md p-4">
              <div className="mb-2">
                <span className="text-xl font-bold">{i.username}</span>
              </div>
              <p className="text-sm mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                {i.email}
              </p>
              <p className="text-sm mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-1" />
                {i.phoneNo}
              </p>
          
      
              <p className="text-sm mb-2">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-1" />
               {i.qualification}
             </p>
              <p className="text-sm mb-2">
              <FontAwesomeIcon icon={faGuitar} className="mr-1" />
               {i.interest}
             </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default ORGSearch
