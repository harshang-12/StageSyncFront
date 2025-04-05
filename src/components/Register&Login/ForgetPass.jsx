import axios from 'axios';
import React, { useState , useEffect   } from 'react'
import { json, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../../imgSrc/StagesyncLogo.jpeg"

function ForgetPass() {
  const apiKey = import.meta.env.VITE_BASE_URL ;
  useEffect( ()=>{
        console.log(apiKey); 
      }, [apiKey] )

  const navigate = useNavigate();

  const [email , setEmail ] = useState('') 
  const [password , setPassword ] = useState('')


  const checkData = async () => {

    // toast.error("Success Notification !", {
    //   position: toast.POSITION.BOTTOM_LEFT,
    // });

    console.log("mail : " , email);
    console.log("pass : " , password);
    try {
      const result = await axios.post(`${apiKey}/login`, {
          email,
          password
      });
  
      console.log(result);
  
      if (result.data.success) {
          localStorage.setItem("userInfo", JSON.stringify(result.data))  ;
          
          if(result.data.chooseTerm === "Organizer"){
            navigate(`profile/Organizer`);
          }
          else{
            navigate('profile/Performer')
          }
      } else {
          toast.error("Login failed.", {
              position: toast.POSITION.BOTTOM_LEFT,
          });
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


      <div className='mt-2'>
        <label htmlFor="">Email : </label>
        <input type="text"
        onChange={(e)=> setEmail(e.target.value)}
        className='inputFields' />
      </div>


      {/* <div className='mt-2'>
        <div className='flex justify-between '>

        <label htmlFor="">Password : </label>

       
        </div>
        <input type="password"
        onChange={(e)=> setPassword(e.target.value)}
        className='inputFields' />
      </div>
      <div>
      <span className='text-blue-600 hover:underline cursor-pointer '>

Forgot password?
</span>
      </div> */}

      
      <a className='mt-2 flex justify-center '>
        <button 
        className='formBtn ' 
        onClick={checkData}
        >
         Verify 
        </button>
      </a>
      </div>

    </div>


    </>
  )
}

export default ForgetPass
