import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function PFMProfile() {
  const apiKey = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const storedData = localStorage.getItem('userInfo');
  const term = JSON.parse(storedData).id;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    qualification: '',
    interest: '',
    successStory: '',
    phoneNo: '',
    image: null,
  });

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const result = await axios.get(`${apiKey}/performers/${id}`);
        const user = result?.data?.data?.user;
        const performer = result?.data?.data?.profileData;

        setFormData({
          username: user?.username || '',
          email: user?.email || '',
          qualification: performer?.qualification || '',
          interest: performer?.interest || '',
          successStory: performer?.successStory || '',
          phoneNo: performer?.phoneNo || '',
          image: performer?.image || null,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserById(id);
  }, [id]);

  return (
    <>
      <div className="card rounded-md shadow-md w-full mx-auto">
        {/* Profile Header */}
        <div className="profileHeader flex justify-evenly items-center gap-2 p-4">
          {/* Profile Image */}
          <div className="w-28 h-28 overflow-hidden rounded-full border border-gray-300 flex justify-center items-center">
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            )}
          </div>

          {/* Profile Information */}
          <div className="flex justify-end">
            <div>
              <div className="mb-2">
                <span className="text-xl font-semibold">{formData.username}</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-600">
                  <FontAwesomeIcon icon={faEnvelope} /> {formData.email}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-gray-600">
                  <FontAwesomeIcon icon={faPhone} /> {formData.phoneNo}
                </span>
              </div>
              {term == id && (
                <div className="flex justify-start">
                  <button
                    onClick={() => navigate(`/pfm/profile/${id}/edit`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4 mt-4">
        {/* Profile Content */}
        <div className="">
          {/* Qualification */}
          <div className="mb-4 flex align-center">
            <h2 className="text-lg font-semibold mr-2">Qualification:</h2>
            <p className="text-gray-700">{formData.qualification}</p>
          </div>

          {/* Interest */}
          <div className="mb-4 flex align-center">
            <h2 className="text-lg font-semibold mr-2">Interest:</h2>
            <p className="text-gray-700">{formData.interest}</p>
          </div>

          {/* Success Story */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mr-2">Success Story:</h2>
            <p className="text-gray-700">{formData.successStory}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PFMProfile;
