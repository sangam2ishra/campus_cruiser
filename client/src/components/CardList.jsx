/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";
import React from "react";
import { Button, Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardList = ({ travel,pnr }) => {
     const travelId=travel._id;
    console.log(travelId);
    console.log({pnr});


  return (
    <Card className="max-w-sm bg-slate-100">
      <div>
        <img
          className="h-48 mx-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter  hover:scale-110"
          src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"
          alt="image description"
        />
      </div>
      <p className="text-2xl font- tracking-tight text-gray-900 dark:text-white">
        Preferences:
      </p>
      {travel.preferences.map((pref, index) => (
        <div key={index}>
          Coach: {pref.coach}, Seat No: {pref.seatNo}
        </div>
      ))}

      <div className="flex justify-between my-3 ">
        <p className="mr-10 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          Train Name:
        </p>
        <p className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          {travel.trainInfo.name}({travel.trainInfo.trainNo})
        </p>
      </div>
      <div className="flex justify-between my-3 ">
        <p className="text-blue-700 text-1xl font-bold tracking-tight  dark:text-white">
          Boarding: <br /> {travel.trainInfo.boarding}
        </p>
        <p className="text-blue-700 text-1xl font-bold tracking-tight  dark:text-white">
          Destination: <br />
          {travel.trainInfo.destination}
        </p>
      </div>
      <div className="text-center my-3">
        <p>
          {" "}
          <b>Date:{travel.trainInfo.dt}</b>
        </p>
      </div>

      <div className="border-solid border-2 border-blue-500  hover:rounded-md hover:border-purple-600-800 hover:scale-110 duration-1000 hover:bg-gradient-to-r from-purple-500 via-purple-200 to-blue-500 hover:font-semibold  hover:text-black rounded-sm py-8 px-4">
        <p>
          {" "}
          Passenger Info:
          {travel.passengerInfo.map((passenger, index) => (
            <p key={index}>
              Passenger {index + 1}: Coach {passenger.currentCoach}, Berth No.{" "}
              {passenger.currentBerthNo}
            </p>
          ))}
        </p>
      </div>

      <button
        type="button"
        className="text-black font-bold bg-gradient-to-r from-purple-500 via-purple-200 to-blue-500 hover:scale-110 duration-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >  
         <span className='mx-auto h-'>
    <img className='mx-auto' style={{ maxWidth: '25px', maxHeight: '50px' }} src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/external-Namaste-pongal-icongeek26-glyph-icongeek26.png" alt="external-Namaste-pongal-icongeek26-glyph-icongeek26"/>
  </span>


        <span className="mx-auto">Ask for Swap </span>
        <svg
          className=" rtl:rotate-180 w-12 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </Card>
  );
};

export default CardList;
