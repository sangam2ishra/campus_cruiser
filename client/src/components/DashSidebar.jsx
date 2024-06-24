/* eslint-disable no-unused-vars */
import { Sidebar } from 'flowbite-react';

import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlineCurrencyDollar
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  console.log(currentUser.paymentDues);



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
   
  const checkoutHandler = async (amount) => {
    // Fetch the Razorpay key and initiate the payment process
    const response = await fetch("/api/pay/getkey");
    const { key } = await response.json();

    const razorOptions = {
      key: key,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "IIT BBS",
      description: "Travel cruiser",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Indian_Institute_of_Technology_Bhubaneswar_Logo.svg/1200px-Indian_Institute_of_Technology_Bhubaneswar_Logo.svg.png",
      prefill: {
        name: "Rustam kumar",
        email: "rk@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#121212",
      },
      handler: function (response) {
        // Payment success callback
        console.log("Payment successful!", response);

        // Proceed with booking after successful payment
       // handleSubmit();
      },
    };

    const razorpay = new window.Razorpay(razorOptions);
    razorpay.open();
  };

  useEffect(() => {
    // Initialize Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup function to remove the script after component unmounts
      document.body.removeChild(script);
    };
  }, []);



  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56  mt-2'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1 '>
          {currentUser && currentUser.role==='Admin' && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.role==='Admin' ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <div>
          {currentUser.role==='Admin' && (
            <Link to='/schedule'>
              <Sidebar.Item
                // active={tab === 'admin'}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Upload Schedule
              </Sidebar.Item>
            </Link>
          )}
           </div>
           <div>
          { (
            <div> 
              <span className='mx-2 text-bold  hover:cursor-pointer  font-bold text-2xl text-red-700'  onClick={() => {
                    
                    checkoutHandler(50);
                  }}     >Expenses</span>
              <Sidebar.Item
                // active={tab === 'admin'}
                icon={HiOutlineCurrencyDollar}
                as='div'
              >
               
                {currentUser.paymentDues}
              </Sidebar.Item>
            </div>
          )}
           </div>
           
          {/* {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}