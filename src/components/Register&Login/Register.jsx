import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../imgSrc/StagesyncLogo.jpeg'

import { ValidUserName, ValidEmail } from './RegEx'

import axios from 'axios'
import Validation from './Validation'


function Register() {

  const apiKey = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    console.log(apiKey);
  }, [])

  let navigate = useNavigate()

  const [username, setusername] = useState()
  const [email, setEmail] = useState()
  const [chooseTerm, setChooseTerm] = useState()
  const [password, setPassword] = useState()

  const [show, setshow] = useState(false);


  const [errUserName, setErrUserName ] = useState('')
  const [errEmail , setErrEmail ] = useState('')
  const [errTerm , setErrTerm] = useState('')
  const [errPassword ,setErrPassword ] = useState('')

 



  const RegisterSubmit = async (data) => {

    

    try {
      const result = await axios.post(`${apiKey}/register`, data);
      console.log(result.data);

      if(result.data){   
        navigate('/Login');
      }
    } catch (err) {
      console.error(err);
    }
  }


  const validateform = () => {


    const data = {
      username,
      email,
      chooseTerm,
      password
    }

    console.log(data);


    let err = Validation(data)


    if(Object.keys(err).length === 0 ){

      RegisterSubmit(data)

      console.log('form Submited successfully ');

      setErrEmail(err.email)
      setErrUserName(err.username)
      setErrTerm(err.chooseTerm)
      setErrPassword(err.password)
    }
    else{

      console.log("this error " , (err));
      setErrEmail(err.email)
      setErrUserName(err.username)
      setErrTerm(err.chooseTerm)
      setErrPassword(err.password)

    }
  }

  return (
    <>

      <div className='form-container'>

        <div className='form'>

          <div className='  flex justify-between mb-2 '>
            <div>
              <img
                className='logo'
                src={logo}
                alt="" />
            </div>
            <div className='pt-2'>
              <span className='text-3xl '>
                Register
              </span>

            </div>
          </div>


          <div className='mb-2'>
            <label htmlFor="" >Username: <span className='text-red-600'>*</span></label>
            <input
              type="text"
              className='inputFields '
              onChange={(e) => setusername(e.target.value)}
            />
          {
            errUserName && 

            <span className='text-red-600'>
              {errUserName}
            </span>}
          </div>
          <div className='mb-2'>
            <label htmlFor="">E-Mail: <span className='text-red-600'>*</span></label>
            <input
              type="text"
              className='inputFields'
              onChange={(e) => setEmail(e.target.value)}
            />
              {
            errEmail && 

            <span className='text-red-600 '>
             {errEmail}
            </span>}
          </div>
          <div className='mb-2'>

          <label htmlFor="" >Term: <span className='text-red-600'>*</span></label>

              <select onChange={(e)=> setChooseTerm(e.target.value)} className='inputFields'>
                <option value='0'> 
                    Please Select
                </option>
                <option value='1'> 
                    Organizer
                </option>
                <option value='2'> 
                    Performer
                </option>
              </select>

          {
            errTerm && 

            <span className='text-red-600 '>
             {errTerm}
            </span>}

          </div>

          <div className='mb-2'>
            <label htmlFor="">Password : <span className='text-red-600'>*</span></label>



            <div
             style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type={show ? 'text' : 'password'}
                className='reletiveFields inputFields'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={() => setshow(!show)}
                className='passBtn text-black'
                style={{ marginLeft: '-35px' , marginTop:"-5px" }} // Adjust the margin as needed
              >
                {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            </div>
            {
            errPassword && 

            <span className='text-red-600 '>
             {errPassword}
            </span>}


          </div>
          <div className='mb-2 pt-2'>
          <Link to={`/login`}>
            <span className='text-blue-700 hover:underline cursor-pointer'>
              If you have already registered
            </span>
            </Link>
          </div>
          <div className='mt-3   '>

            <div>

              <button
                className='formBtn'
                onClick={validateform}>Submit</button>
            </div>

          </div>


        </div>
      </div>



    </>
  )
}

export default Register
