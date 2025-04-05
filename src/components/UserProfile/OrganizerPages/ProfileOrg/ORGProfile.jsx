import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faPaperPlane, faCalendar, faClock, faMapMarkerAlt, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import moment from 'moment';
import defaultImage from '../../../../imgSrc/640px-Default_pfp.svg.webp'


function ORGProfile() {

  const apiKey = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const storedData = localStorage.getItem('userInfo');
  const term = JSON.parse(storedData).id;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNo: '',
    organizationName: '',
    organizationType: '',
    address: '',
    additionalInfo: '',
    imageUrl: ''
  });

  const [schedleList, setSchedleList] = useState([]);

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const result = await axios.get(`${apiKey}/organizers/${id}`);
        const data = result.data.data;



        setFormData({
          username: data?.user?.username,
          email: data?.user?.email,
          phoneNo: data?.profileData?.phoneNo,
          organizationName: data?.profileData?.organizationName,
          organizationType: data?.profileData?.organizationType,
          address: data?.profileData?.address,
          additionalInfo: data?.profileData?.additionalInfo,
          imageUrl: data?.profileData?.image
        });


      } catch (err) {
        console.log(err);
      }
    };
    const getSchedleList = async (id) => {
      try {

        const UserSchedules = await axios.get(`${apiKey}/UsersOrganizerSchedule/${id}`);
        setSchedleList(UserSchedules.data.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };

    getUserById(id);
    getSchedleList(id);
  }, [id]);

  const deleteById = async (scheduleId) => {
    try {
      const res = await axios.delete(`${apiKey}/organizerSchedule/${scheduleId}`);
      if (res) {
        setSchedleList(schedleList.filter((i) => i._id !== scheduleId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { username, email, phoneNo, organizationName, organizationType, address, additionalInfo, imageUrl } = formData;

  return (
    <>
      <div className='card'>
        <div className='profileHeader flex justify-evenly items-center gap-2 p-4'>
          <div className='flex'>
            {/* <img src={imageUrl} alt="Profile" className='w-32 h-32 rounded-full border border-gray-300' /> */}
            <div className="w-28 h-28 overflow-hidden rounded-full border border-gray-300 flex justify-center items-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Selected" className="object-cover w-full h-full" />
              ) : (
                <img src={defaultImage} alt="Default" className="object-cover w-full h-full" />
              )}
            </div>
          </div>
          <div className='flex justify-end'>
            <div>
              <div className='mb-2'>
                <span className='text-2xl font-semibold'>{username}</span>
              </div>
              <div className='mb-2'>
                <span className='text-gray-600'> <FontAwesomeIcon icon={faEnvelope} /> {email}</span>
              </div>
              <div className='mb-2'>
                <span className='text-gray-600'> <FontAwesomeIcon icon={faPhone} /> {phoneNo}</span>
              </div>
              {term === id && (
                <div className='flex justify-start'>
                  <button onClick={() => navigate(`/org/profile/${id}/edit`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='card p-4 mt-4'>
        <div>
          <div className="mb-4 flex align-center">
            <h2 className="text-md font-semibold mr-2">Organization Name:</h2>
            <p className="text-gray-700">{organizationName}</p>
          </div>
          <div className="mb-4 flex align-center">
            <h2 className="text-md font-semibold mr-2">Organization Type:</h2>
            <p className="text-gray-700">{organizationType}</p>
          </div>
          <div className="mb-4 flex align-center">
            <h2 className="text-md font-semibold mr-2">Address:</h2>
            <p className="text-gray-700">{address}</p>
          </div>
          <div className="mb-4 flex align-center">
            <h2 className="text-md font-semibold mr-2">Additional Information:</h2>
            <p className="text-gray-700">{additionalInfo}</p>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <span className='text-lg fw-bold'>Event Schedule:</span>
      </div>

      <div className="container mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedleList.map((i) => (
            <div key={i._id} className="mb-4">
              <div className="card p-4">
                <div className="mb-2">
                  <span className="text-xl font-bold">{i.eventName}</span>
                </div>
                <p className="text-sm mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  {i.location}
                </p>
                <p className="text-sm mb-2">
                  <FontAwesomeIcon icon={faCalendar} /> {i.days !== 1
                    ? `${moment(i.eventStartDate).format('DD/MM/yyyy')} - ${moment(i.eventEndDate).format('DD/MM/yyyy')}`
                    : moment(i.eventStartDate).format('DD/MM/yyyy')}
                </p>
                <p className='text-sm mb-2'>
                  <FontAwesomeIcon icon={faClock} /> {i.startTimePerDay} to {i.endTimePerDay}
                </p>
                <p className="text-sm mb-2">{i.description}</p>
                {term === id && (
                  <div className='flex justify-end gap-2'>
                    <button onClick={() => navigate(`/org/editSchedule/${id}/${i._id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={() => deleteById(i._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ORGProfile;
