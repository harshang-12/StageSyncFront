import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultImage from '../../../../imgSrc/640px-Default_pfp.svg.webp'

function ORGEditProfile() {
  const apiKey = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  // State variable using a single formData object

  const [selectedImage, setSelectedImage] = useState();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNo: '',
    organizationName: '',
    organizationType: '',
    address: '',
    additionalInfo: '',
    image: ''
  });

  // Function to handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a URL for the selected image
      setFormData(prevData => ({
        ...prevData,
        image: file // Set the image preview URL in the form data
      }));
      setSelectedImage(imageURL);
    }
  };

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
          organizationType: data?.profileData?.organizationType || '',
          address: data?.profileData?.address,
          additionalInfo: data?.profileData?.additionalInfo,
          image: data?.profileData?.image
        });

        setSelectedImage(data?.profileData?.image);
      } catch (err) {
        console.log(err);
      }
    };

    getUserById(id);
  }, [apiKey, id]);

  const updateData = async (data) => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('image', data.image || ''); // If image is falsy, append an empty string
      formDataToSend.append('username', data.username || ''); // Fallback to empty string if username is missing
      formDataToSend.append('email', data.email || '');
      formDataToSend.append('organizationName', data.organizationName || '');
      formDataToSend.append('organizationType', data.organizationType || '');
      formDataToSend.append('address', data.address || '');
      formDataToSend.append('additionalInfo', data.additionalInfo || '');
      formDataToSend.append('phoneNo', data.phoneNo || '');


      const response = await axios.post(`${apiKey}/updateOrganizerById/${id}`, formDataToSend);

      if (response) {
        navigate(`/org/profile/${id}`);
      }

      console.log(formDataToSend);
      console.log('Image uploaded successfully:', response.data.image);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData) {
      updateData(formData);
    }
  };

  return (
    <div className='card p-3'>
      <div className="space-y-4">
        <div className="flex flex-row space-x-4 w-full">
          <div className='flex justify-between align-center w-1/2'>
            <div className="flex justify-center">
              {/* Selected Image Displayed in Circle */}
              <div className="w-28 h-28 overflow-hidden rounded-full border border-gray-300 flex justify-center items-center">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="object-cover w-full h-full" />
                ) : (
                  <img src={defaultImage} alt="Default" className="object-cover w-full h-full" />
                )}
              </div>

            </div>

            <div className="">
              <label htmlFor="upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Upload Image
              </label>
              <input type="file" id="upload" className="hidden" onChange={handleUpload} />
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="username" className="font-medium">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
        </div>

        <div className="flex flex-row space-x-4 w-full">
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="font-medium">Email <span className="text-red-500">*</span></label>
            <input
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="text"
              id="email"
              value={formData.email}
              className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="phone" className="font-medium">Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              value={formData.phoneNo}
              className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex flex-row space-x-4 w-full">
          <div className="flex flex-col w-1/2">
            <label htmlFor="qualification" className="font-medium">Organization Name:</label>
            <input
              type="text"
              id="qualification"
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              value={formData.organizationName}
              className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="interest" className="font-medium">Organization Type:</label>
            <input
              type="text"
              id="interest"
              onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
              value={formData.organizationType}
              className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex flex-row space-x-4 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="successStory" className="font-medium">Address:</label>
            <textarea
              id="successStory"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 h-20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-row space-x-4 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="successStory" className="font-medium">Additional Information:</label>
            <textarea
              id="successStory"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 h-20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ORGEditProfile;
