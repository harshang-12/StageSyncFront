import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PFMEditProfile() {
  const apiKey = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  // Consolidated state object
  const [formData, setFormData] = useState({
    selectedImage: null,
    username: '',
    email: '',
    qualification: '',
    interest: '',
    successStory: '',
    phoneNo: '',
  });

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, selectedImage: file }));
    }
  };

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const result = await axios.get(`${apiKey}/performers/${id}`);
        const data = result?.data?.data;

        // Populate form data from API response
        setFormData({
          selectedImage: data?.profileData?.image, // Assuming you have an 'image' field in your data
          username: data?.user?.username || '',
          email: data?.user?.email || '',
          qualification: data?.profileData?.qualification || '',
          interest: data?.profileData?.interest || '',
          successStory: data?.profileData.successStory || '',
          phoneNo: data?.profileData?.phoneNo || '',
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserById(id);
  }, [apiKey, id]);

  const updateData = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append('image', formData.selectedImage);
      uploadData.append('username', formData.username);
      uploadData.append('email', formData.email);
      uploadData.append('qualification', formData.qualification);
      uploadData.append('interest', formData.interest);
      uploadData.append('successStory', formData.successStory);
      uploadData.append('phoneNo', formData.phoneNo);

      const response = await axios.post(
        `${apiKey}/UpdatePerformersById/${id}`,
        uploadData
      );
      console.log('Data submitted successfully:', response.data);

      if (response) {
        navigate(`/pfm/profile/${id}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateData();
  };

  return (
    <>
      <div className="card p-3">
        <div className="space-y-4">
          <div className="flex flex-row space-x-4 w-full">
            <div className="flex justify-between align-center w-1/2 ">
              <div className="flex justify-center">
                <div className="w-28 h-28 overflow-hidden rounded-full border border-gray-300 flex justify-center items-center">
                  {formData.selectedImage ? (
                    <img
                      src={
                        typeof formData.selectedImage === 'string'
                          ? formData.selectedImage
                          : URL.createObjectURL(formData.selectedImage)
                      }
                      alt="Selected"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src=""
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="upload"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="username" className="font-medium">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-1/2">
              <label htmlFor="email" className="font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="phoneNo" className="font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-1/2">
              <label htmlFor="qualification" className="font-medium">
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="interest" className="font-medium">
                Interest
              </label>
              <input
                type="text"
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="successStory" className="font-medium">
                Success Story
              </label>
              <textarea
                id="successStory"
                name="successStory"
                value={formData.successStory}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-1 h-40 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
    </>
  );
}

export default PFMEditProfile;
