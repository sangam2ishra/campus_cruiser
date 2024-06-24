/* eslint-disable no-unused-vars */
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';

import BackToTop from './components/BackToTop';
import PrivateRoute from './components/PrivateRoute';
import BookTrip from './pages/BookTrip';
import Schedule from './pages/Schedule';
// import PdfPage from './pages/PdfPage'
import PdfService from './pages/PdfService';
export default function App() {
  return (
    // <div>
    //   App
    // </div>
    <BrowserRouter>
    <Header/>
    <BackToTop/>
    <Routes>  
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/sign-in' element={<SignIn/>} />
         <Route path='/sign-up' element={<SignUp/>} />
         <Route path='/bookTrip' element={<BookTrip/>} />
      {/* //   <Route path='/schedule' element={<Schedule/>} /> */}
         <Route path='/schedule' element={<Schedule/>} />
         <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
       
        

         {/* <Route path='/swap-request/:pnrNumber' element={<SeatSelectionForm/>} />
         <Route  path="/SwapResults"   element={  <SwapResults /> }  /> */}
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  )
}
