/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button, Card } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { Link } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function PnrCard({ travel, type }) {
  const travelId1=travel.id;
  console.log(travel);
  // Check if travel is defined before accessing its properties
  if (!travel) {
    return null; // Or you can render a loading indicator or an error message
  }

  const pnrNumber = travel.pnrNo;
  console.log(pnrNumber);
  return (
    <div className="mt-9 ">
    
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          PNR : {travel.pnrNo}
        </h5>
        <div className="text-center w-full bg-gradient-to-r from-black via-purple-400 to-pink-400 text-white">
          <p>Your Ticket is Cofirmed</p>
        </div>
         <div className="flex justify-between my-3 " >
              <p className="mr-10">Train Name: 
                </p>    
                <p>
                {travel.trainInfo.name}
                ({travel.trainInfo.trainNo})
                </p>
         </div>
         <div className="flex justify-between my-3 " >
              <p className="text-blue-700">
              Boarding: <br /> {travel.trainInfo.boarding} 
                </p>    
                <p className="text-blue-700">
                Destination:{" "} <br />
          {travel.trainInfo.destination}
                </p>
         </div>
        <div className="text-center my-3">
        <p > <b>Date:{travel.trainInfo.dt}</b></p>
        </div>
        
        <div className="border-solid border-2 border-blue-500  hover:rounded-md hover:border-indigo-800 hover:scale-110 duration-1000 hover:bg-gradient-to-r from-blue-400 via-purple-200 to-pink-300 hover:font-semibold  hover:text-black rounded-sm py-8 px-4">
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
        
       <Link to={`/swap-request/${pnrNumber}`} className="mx-auto">  <Button className="my-8" outline gradientDuoTone="purpleToBlue">
          <span className="px-20">Go For Swap </span>  <HiOutlineArrowRight className=" h-5 w-5" />
      </Button></Link>
      
      </Card>
      

      
    </div>
  );
}
