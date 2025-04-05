import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faList, faAngleDown, faAngleUp, faUserGraduate, faGuitar, faEnvelope, faPhone, faPaperPlane, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function LogOut() {

  const apiKey = import.meta.env.VITE_BASE_URL;


  const [openlogout, setOpenLogout] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)


  const navigate = useNavigate()

  const {id} = useParams()


  const logOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login')
  }


  const deleteAcc = async()=> {
    try{
      
      const deleteUser = await axios.delete(`${apiKey}/deleteUser/${id}`)

      if(deleteUser){
        localStorage.removeItem('userInfo');
        navigate('/register');
      }
    }
    catch(err){
          console.log(err);
    }
  }


  return (
    <>
      <div className='card  '>
        <div
          className={openlogout ? 'flex justify-between p-2 borderbottum cursor-pointer' : 'flex justify-between p-2 cursor-pointer '}
          onClick={() => setOpenLogout(!openlogout)} >

          <div>

            <span>
              Log Out

            </span>
          </div>
          <div>
            {
              openlogout ?
                <FontAwesomeIcon icon={faAngleUp} />
                :
                <FontAwesomeIcon icon={faAngleDown} />

            }
          </div>
        </div>

        {
          openlogout && (
            <div className='p-2 flex justify-between align-center '>
              <div className='text-red-500'>
                Are you sure you want to log out ? 
              </div>
              <div>

              <button
                onClick={logOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
                Logout
              </button>
              <button onClick={() => setOpenLogout(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
              </div>

            </div>
          )
        }

      </div>


      <div className='card  mt-2'>
        <div
          className={openDelete ? 'flex justify-between p-2 borderbottum cursor-pointer' : 'flex justify-between p-2 cursor-pointer '}
          onClick={() => setOpenDelete(!openDelete)} >
          <div>
            <span>
              Delete Account
            </span>
          </div>
          <div>
            {
              openDelete ?
                <FontAwesomeIcon icon={faAngleUp} />
                :
                <FontAwesomeIcon icon={faAngleDown} />
            }
          </div>
        </div>
        {
          openDelete && (
            <div className='p-2 flex justify-between align-center '>
              <div className='text-red-500'>
                Are you sure you want to Delete Account ? 
              </div>
              <div>
              <button
                onClick={deleteAcc}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
                Delete
              </button>
              <button onClick={() => setOpenDelete(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default LogOut
