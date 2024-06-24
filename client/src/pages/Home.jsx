/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Label, TextInput, Button } from "flowbite-react";
import { useState, useRef, useEffect } from "react";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Carousel } from "flowbite-react";
// import BackToTop from './../components/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';

export default function Home() {
 // const pnrSection=useRef();
 const { currentUser } = useSelector((state) => state.user);
 const {theme}=useSelector((state)=>state.theme);
  const [pnr, setPnr] = useState('');
  const [success, setSuccess] = useState(false);
  const [travel, setTravel] = useState({});
  const [loading, setLoading] = useState(false);
  const pnrCardRef = useRef(); // Create a ref for the PnrCard section

  const handleChange = (e) => {
    setPnr(e.target.value);
  }

  const scrollUp=()=>{
    window.scrollTo({
        top:420,
        behavior:"smooth"
    })
}
    useEffect(()=>{
      AOS.init({duration:2000});
    },[]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setSuccess(false);
      const res = await fetch(`/api/pnr/${pnr}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        const data = await res.json();
        setSuccess(true);
        setLoading(false);
        setTravel(data.travel);

        // Scroll to the section where PnrCard is displayed

        scrollUp();
       
      } else {
        setLoading(false);
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
    }
  };

  return (
    <>
    <div>
   
      <div className="grid gap-0">
        <div>
          
         
        </div>
        <div className="w-[600px] md:w-[900px] mx-auto mt-12 h-60 sm:h-64 xl:h-80 2xl:h-80 overflow-hidden">
  <Carousel className="h-full">
    <img src="images/animation.png" alt="..." />
    <img src="images/republic.jpg" alt="..." />
    <img src="images/ses.jpg" alt="..." />
    <img src="images/slide-1.jpg" alt="..." />
    <img src="images/slide-6 (1).jpg" alt="..." />
    <img src="images/division.jpg" alt="..." />
    <img src="images/lhcbuild.jpeg" alt="..." />
  </Carousel>
</div>

     
       
      </div>
      <div className="min-h-screen mt-56">
      <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h1 className="mb-8 h-6  text-3xl"> What is "Campus Cruiser"?</h1>
          <p>"Campus Cruiser" serves as a transportation service specifically tailored for the community of IIT Bhubaneswar. It offers a convenient means of travel both within the confines of the campus and beyond its borders. Essentially, "Campus Cruiser" functions as a shuttle service, facilitating transportation needs for students, faculty, and staff members of IIT Bhubaneswar. </p>
        </div>
        <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h2 className="mb-8 h-6  text-3xl">Who can access the facilities of the campus cruiser?</h2>
          <p>Only students and faculty members of IIT Bhubaneswar can avail of the Campus Cruiser service. Users must possess valid email credentials associated with IIT Bhubaneswar, specifically with domain names ending in "@itbbs.ac.in". </p>
        </div>
        <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h2 className="mb-8 h-6  text-3xl">Can anyone book trips in advance?</h2>
          <p>Yes, trips can be booked in advance through the Campus Cruiser service. Users can initiate bookings by selecting the "Book Trip" option, specifying the source, destination, date, and preferred bus. Upon successful booking, users receive email notifications confirming their reservation.</p>
         
        </div>
        <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
          <h2 className="mb-8 h-6  text-3xl">Is the booking service free or paid?</h2>
          <br /><br />
          <p>No, the booking service provided by the Campus Cruiser is not free. Users are required to pay a nominal fee of Rs. 50 for each trip they book through the service. This fee ensures the sustainability and maintenance of the transportation service, covering expenses such as fuel, maintenance, and staff salaries. While the fee is relatively small, it contributes to the efficient functioning of the Campus Cruiser service, ensuring that it remains operational and accessible to all users. Additionally, the paid nature of the service may also help in managing demand and ensuring that resources are allocated efficiently.
          <br /><br />
       
        </p>
      </div>
      <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
        <h2 className="mb-8 h-6  text-3xl"> What are the available options for payment?</h2>
        <p>Users have various payment options available to settle their dues. They can opt for UPI (Unified Payments Interface), net banking, card payments, among others. Additionally, faculty members have the option to defer payments by selecting the "Pay Later" option, allowing them to clear their dues at a later date, typically at the end of the month. </p>
      </div>
      <div
  data-aos="fade-right"
  className={`mx-4 md:mx-10 my-3 p-14 shadow-lg rounded-lg text-black dark:text-white ${
    theme === "dark"
      ? "bg-gradient-to-r from-black via-purple-600 to-black"
      : "bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400"
  }`}
>
        <h2 className="mb-8 h-6  text-3xl"> How can users view the bus schedule?</h2>
        <p>Users can access the bus schedule by clicking on the "View Schedule" option. This provides them with a comprehensive view of the bus schedules for the current and past months. Any updates or new schedules are communicated to users via email notifications. It's important to note that the bus schedule is updated by the admin only.</p>
      </div>
    </div>

    </div>
  
</>
);
}
