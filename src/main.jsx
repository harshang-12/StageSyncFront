import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './AppRouting/App.jsx'
import './index.css'
import './App.css'



import { Link, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import AuthLayout from "./AppLayOuts/AuthLayout"
import Login from './components/Register&Login/Login'
import Register from './components/Register&Login/Register'
import ForgetPass from './components/Register&Login/ForgetPass'
import OrganizerProfile from './components/UserProfile/OrganizerPages/OrganizerProfile'
import Layout from './AppLayouts/Layout'
import PerformerProfile from './components/UserProfile/PerformerPages/PerformerProfile'
import PerformerSearch from './components/UserProfile/PerformerPages/PerformerSearch'
import PFMProfile from './components/UserProfile/PerformerPages/ProfilePfm/PFMProfile'
import PFMEditProfile from './components/UserProfile/PerformerPages/ProfilePfm/PFMEditProfile'
import ORGProfile from './components/UserProfile/OrganizerPages/ProfileOrg/ORGProfile'
import ORGEditProfile from './components/UserProfile/OrganizerPages/ProfileOrg/ORGEditProfile'
import CreateScheduleORG from './components/UserProfile/OrganizerPages/ORGSchedule/CreateScheduleORG'
import EditScheduleORG from './components/UserProfile/OrganizerPages/ORGSchedule/EditScheduleORG'
import ORGSearch from './components/UserProfile/OrganizerPages/ORGSearch'
import LogOut from './components/ReusableCompo/LogOut'
import Home from './components/ReusableCompo/Home'

const isAuthenticated = () => {
  // Check if a user is authenticated based on your localStorage logic


  return localStorage.getItem('userInfo') !== null;

};

// console.log(isAuthenticated());

const ProtectedRoute = ({ element, fallbackPath = '/' }) => {
  return isAuthenticated() ? element : <Navigate to={fallbackPath} />;
};

const router = createBrowserRouter([

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: (<div className="h-screen w-full flex items-center justify-center">
          <div className="text-center text-lg">
            <span>
              Hello This is Home Page,&nbsp;
              <Link to="/register" className="hover:text-blue-600 ">
                Click here to access register page
              </Link>
            </span>
          </div>
        </div>
        )
      },

      {
        path: '/login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forget-password',
        element: <ForgetPass />
      },


      // {
      //   path: "/",
      //   element: <Layout />,
      //   children: [
      //     {
      //       path: "/",
      //       element: <Home />
      //     },
      //     {
      //       path: "/Register",
      //       element: <Register />
      //     },
      //     {
      //       path: "/Login",
      //       element: <Login />
      //     }
      //   ]
      // },
    ]
  },

  {
    path: '*',
    element: <h1>Error 404</h1>
  },
  {
    path: '/org',
    element: (
      <ProtectedRoute
        element={<Layout />}
        fallbackPath="/login"
      >
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/org',
        element: <ProtectedRoute
          element={<Home />}
        />
      },
      {
        path: '/org/search',
        element: <ProtectedRoute
          element={<ORGSearch />}
        />
      }
      ,
      {
        path: '/org/createSchedule/:id',
        element: <ProtectedRoute
          element={<CreateScheduleORG />}
        />
      }
      ,
      {
        path: '/org/editSchedule/:id/:ScheduleId',
        element: <ProtectedRoute
          element={<EditScheduleORG />}
        />
      }
      ,
      {
        path: '/org/profile/:id',
        element: <ProtectedRoute
          element={<ORGProfile />}
        />
      }
      ,
      {
        path: '/org/profile/:id/edit',
        element: <ProtectedRoute
          element={<ORGEditProfile />}
        />
      },
      {
        path: '/org/pfm/profile/:id',
        element: <ProtectedRoute
          element={<PFMProfile />}
        />
      }
      ,
      {
        path: '/org/more/:id',
        element: <ProtectedRoute
          element={<LogOut />}
        />
      }
    ]
  },
  {
    path: '/pfm',
    element: (
      <ProtectedRoute
        element={<Layout />}
        fallbackPath="/login"
      >
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/pfm',
        element: <ProtectedRoute
          element={<Home />}
        />
      },
      {
        path: '/pfm/search',
        element: <ProtectedRoute
          element={<PerformerSearch />}
        />
      }
      ,
      {
        path: '/pfm/profile/:id',
        element: <ProtectedRoute
          element={<PFMProfile />}
        />
      }
      ,
      {
        path: '/pfm/profile/:id/edit',
        element: <ProtectedRoute
          element={<PFMEditProfile />}
        />
      }
      ,
      {
        path: '/pfm/more/:id',
        element: <ProtectedRoute
          element={<LogOut />}
        />
      }
    ]
  }


])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider
      router={router} />
  </React.StrictMode>,
)
