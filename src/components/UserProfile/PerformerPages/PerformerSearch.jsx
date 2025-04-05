import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faList, faPaperPlane, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';

function PerformerSearch() {
  const apiKey = import.meta.env.VITE_BASE_URL;

  const [schedleList, setSchedleList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [performerDetail, setPerformerDetail] = useState();

  const [loading, setLoding] = useState()





  useEffect(() => {


    const getUserById = async () => {


      const storedData = localStorage.getItem('userInfo');
      const id = JSON.parse(storedData).id;

      try {
        const result = await axios.get(`${apiKey}/organizerSchedule`);
        setSchedleList(result.data.data.reverse());

        const performer = await axios.get(`${apiKey}/performers/${id}`);


        setPerformerDetail(performer.data.performer);



      } catch (err) {
        console.log(err);
      }
    };
    getUserById();
  }, []);

  const filteredList = schedleList.filter(i => {
    const searchTermLower = searchTerm.toLowerCase();
    const startDateMatch = moment(i.eventStartDate).format('DD/MM/yyyy').toLowerCase().includes(searchTermLower);
    const endDateMatch = moment(i.eventEndDate).format('DD/MM/yyyy').toLowerCase().includes(searchTermLower);
    const startTimeMatch = i.startTimePerDay.toLowerCase().includes(searchTermLower);
    const endTimeMatch = i.endTimePerDay.toLowerCase().includes(searchTermLower);

    return (
      (i.eventName && i.eventName.toLowerCase().includes(searchTermLower)) ||
      (i.location && i.location.toLowerCase().includes(searchTermLower)) ||
      startDateMatch ||
      endDateMatch ||
      startTimeMatch ||
      endTimeMatch
    );
  });



  const emailSend = async (detail) => {

    let data = {
      performerDetail,
      organizerAndScheduleDetail: detail
    }
    console.log(data);

    setLoding(true)

    try {
      const result = await axios.post(`${apiKey}/sendOrgEmail`, data);
      if (result.data) {
        setLoding(false)
      }

      console.log(result);

    } catch (err) {
      console.log(err);
    }


  }

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
            <div key={i._id} className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4">
                <div className="mb-2">
                  <span className="text-xl font-bold">{i.eventName}</span>
                </div>
                <p className="text-sm mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  {i.location}
                </p>
                {
                  i.days !== 1 ?
                    <p className="text-sm mb-2">
                      <FontAwesomeIcon icon={faCalendar} />    {moment(i.eventStartDate).format('DD/MM/yyyy')} - {moment(i.eventEndDate).format('DD/MM/yyyy')}
                    </p>
                    :
                    <p className="text-sm mb-2">
                      <FontAwesomeIcon icon={faCalendar} />    {moment(i.eventStartDate).format('DD/MM/yyyy')}
                    </p>
                }

                <p className='text-sm mb-2'>
                  <FontAwesomeIcon icon={faClock} />   {i.startTimePerDay} to {i.endTimePerDay}
                </p>
                <p className="text-sm mb-2 text-ellipsis">

                  {i.description}
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded "
                    onClick={() => emailSend(i)}
                  >
                     
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
                          <span>

                            Send
                          </span>
                        </>
                    
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    
    </div>
  );
}

export default PerformerSearch;
