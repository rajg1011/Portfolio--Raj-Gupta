import React  from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route,RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import App from './App'
import Home from './Home'
import { About,CreatePost, BlogPage, Login, SignUp } from './pages'
import BlogData from './blogs/components/blogData'
import PrivateWrapper from './blogs/privateWrapper'
import { AuthProvider } from './authContext/authContext';

const router= createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App/>}>
      <Route path='' element={<Home />}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/auth/sign-up' element={<SignUp/>}/>
      <Route path='/auth/login' element={<Login/>}/>
    </Route>
    <Route element={<PrivateWrapper />}>
      <Route path='/blog' element={<BlogPage/>}/>
      <Route path='/blog/:blogId' element={<BlogData/>}/>
      <Route path='/write-blogs' element={<CreatePost/>}/>
    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <RouterProvider router={router} />
  </AuthProvider>,
)
