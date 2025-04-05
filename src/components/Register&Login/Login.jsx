import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import 'react-toastify/dist/ReactToastify.css';

import logo from "../../imgSrc/StagesyncLogo.jpeg"

function Login() {
  const apiKey = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    console.log(apiKey);
  }, [apiKey])

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setshow] = useState(false);

  const [err, seterr] = useState(false)
  const [loading, setLoding] = useState(false)



  const checkData = async () => {



    console.log("mail : ", email);
    console.log("pass : ", password);
    setLoding(true)
    try {

      const result = await axios.post(`${apiKey}/login`, {
        email,
        password
      });




      if (result.data.success) {
        setLoding(false)
        localStorage.setItem("userInfo", JSON.stringify(result.data.data));

        const storedData = localStorage.getItem('userInfo');
        const loginInfo = JSON.parse(storedData);


        if (loginInfo.chooseTerm == 1) {
          navigate('/org')
        }
        else {
          navigate('/pfm')
        }

      } else {
        seterr(true)
        setLoding(false)
      }
    } catch (err) {
      console.error(err);
    }

  }




  return (
    <>

      <div className='form-container'>

        <div className='form' >

          <div className='  flex justify-between mb-2 '>
            <div>
              <img
                className='logo'
                src={logo}
                alt="" />
            </div>
            <div className='pt-2'>
              <span className='text-3xl '>
                Login
              </span>

            </div>
          </div>
          {
            err &&
            <div className=' flex justify-center bg-red-300 border-2  border-red-600 p-3 rounded-md '>
              <span className='font-semibold text-red-600  '>
                Invalid E-mail or password. Please try again.
              </span>
            </div>}


          <div className='mt-2'>
            <label htmlFor="">Email : </label>
            <input type="email"
              onChange={(e) => setEmail(e.target.value)}
              className='inputFields' />
          </div>
          <div className='mt-2'>
            <label htmlFor="">Password :</label>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type={show ? 'text' : 'password'}
                className='reletiveFields inputFields'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={() => setshow(!show)}
                className='passBtn text-black'
                style={{ marginLeft: '-35px', marginTop: "0px" }} // Adjust the margin as needed
              >
                {
                  show ?
                    <FontAwesomeIcon icon={faEyeSlash} />
                    :
                    <FontAwesomeIcon icon={faEye} />
                }


              </button>
            </div>
          </div>
          <div>

            <span className='text-blue-600 hover:underline cursor-pointer  '>
              Forgot password
            </span>
          </div>
          <div className='mt-2'>
            <Link to={`/register`}>
              <span className='text-blue-600 hover:underline cursor-pointer '>
                if you haven't registered yet
              </span>
            </Link>

          </div>
          <div className='mt-4 flex justify-center '>
            <button
              className='formBtn '
              onClick={checkData}
            >
              {
                loading ?
                  <div role="status" >
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                  :
                  "LogIn"
              }
            </button>
          </div>
        </div>

      </div>


    </>
  )
}

export default Login
