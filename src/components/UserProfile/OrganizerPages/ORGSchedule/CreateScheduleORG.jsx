import axios from 'axios';
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CreateScheduleORG() {

  const apiKey = import.meta.env.VITE_BASE_URL;


  const { id } = useParams()


  const navigate = useNavigate()



  const userId = id;


  const [eventName, setEventName] = useState()
  const [eventStartDate, setEventStartDate] = useState()
  const [eventEndDate, setEventEndDate] = useState()
  const [startTimePerDay, setStartTimePerDay] = useState()
  const [endTimePerDay, setEndTimePerDay] = useState()
  const [location, setLocation] = useState()
  const [description, setDescription] = useState()



  const currentTime = new Date().toISOString().split("T")[0];


  const day = () => {


    let date1 = moment(eventStartDate);
    let date2 = moment(eventEndDate);


    let duration = moment.duration(date2.diff(date1));


    return duration.asDays();


  }


  const createSchedule = async (data) => {
    try {
      const res = await axios.post(`${apiKey}/organizerSchedule`, data)
      console.log(res);
      if (res) {
        navigate(`/org/profile/${userId}`)
      }

    }
    catch (err) {
      console.log(err);
    }
  }



  const onSubmit = () => {

    let data = {
      userId,
      eventName,
      eventStartDate,
      eventEndDate,
      startTimePerDay,
      endTimePerDay,

      days: day() + 1,
      location,
      description
    }

    // console.log(data);

    createSchedule(data);
  }

  return (
    <>
      <div class='card p-3'>
        <div class="space-y-4">

          <div class="flex flex-row space-x-4 w-full">

            <div class="flex flex-col w-1/2">
              <label for="username" class="font-medium">
                Event Name: <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                class="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" required />
            </div>

          </div>

          <div class="flex flex-row space-x-4 w-full">
            <div class="flex flex-col w-1/2">
              <label for="email" class="font-medium">Start date: <span class="text-red-500">*</span></label>
              <input
                onChange={(e) => setEventStartDate(e.target.value)}
                type="date"
                id="email"
                value={eventStartDate}
                min={currentTime}
                class="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>

            <div class="flex flex-col w-1/2">
              <label for="phone" class="font-medium">End date:</label>
              <input
                type="date"
                id="phone"
                onChange={(e) => setEventEndDate(e.target.value)}
                value={eventEndDate}
                min={currentTime}
                class="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>

          </div>

          <div class="flex flex-row space-x-4 w-full">
            <div class="flex flex-col w-1/2">
              <label for="qualification" class="font-medium">Start Time Per Day:</label>
              <input
                type="time"
                id="qualification"
                onChange={(e) => setStartTimePerDay(e.target.value)}
                value={startTimePerDay}
                class="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="interest" class="font-medium">End Time Per Day:</label>
              <input
                type="time"
                id="interest"
                onChange={(e) => setEndTimePerDay(e.target.value)}
                value={endTimePerDay}
                class="border border-gray-300 rounded-md px-3 py-1 h-10 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>

          </div>

          <div className='flex flex-row space-x-4 w-full'>
            <div class="flex flex-col w-full">
              <label for="successStory" class="font-medium">Location:</label>
              <textarea
                id="successStory"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                class="border border-gray-300 rounded-md px-3 py-1 h-20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
          </div>
          <div className='flex flex-row space-x-4 w-full'>
            <div class="flex flex-col w-full">
              <label for="successStory" class="font-medium">Description:</label>
              <textarea
                id="successStory"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                class="border border-gray-300 rounded-md px-3 py-1 h-20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmit}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >

              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateScheduleORG
