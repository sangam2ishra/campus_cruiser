import express from "express";

const router = express.Router();
import PNRController from "../controllers/pnrController.js";

import { applyForSwap } from "../controllers/travelController.js";
import Travel from "../models/travelModel.js";
import User from "../models/userModel.js";


// Create an instance of PNRController
//sangamkr.mishra
//const apiKey = "faa6bac541mshee4e9bf88a81448p12c76ajsnc853689715d2"; // You can fetch this from environment variables if needed

//ssangamkr.mishra
const apiKey = "e2ad1e5765msh05ca3bdf74a69b3p1d036bjsn68c272a895fc"; // You can fetch this from environment variables if needed
const pnrController = new PNRController(apiKey);

router.get("/:pnrNumber", async (req, res) => {
  const { pnrNumber } = req.params;
  const travel=await Travel.findOne({pnrNo: pnrNumber});
  if(travel){
    console.log(travel);
  return res.status(201).json({ success: true, message: "Succesful", travel });
  }

  console.log("---", pnrNumber);
  // console.log(req.body);

  try {
    console.log("hii");
    const pnrStatus = await pnrController.getPNRStatus(pnrNumber);
    //res.json(pnrStatus);
 console.log(pnrStatus);
    console.log("byee");
    const passengers = pnrStatus.data.passengerInfo.map((passenger) => ({
      currentCoach: passenger.currentCoach,
      currentBerthNo: passenger.currentBerthNo,
    }));
    console.log(passengers);

    const travel = new Travel({
      pnrNo: pnrNumber,
      // user:user,
      boardingInfo: {
        trainId: pnrStatus.data.boardingInfo.trainId,
        stationId: pnrStatus.data.boardingInfo.stationId,
        stationName: pnrStatus.data.boardingInfo.stationName,
      },
      destinationInfo: {
        trainId: pnrStatus.data.boardingInfo.trainId,
        stationId: pnrStatus.data.destinationInfo.stationId,
        stationName: pnrStatus.data.destinationInfo.stationName,
      },
      seatInfo: {
        coach: pnrStatus.data.seatInfo.coach,
        berth: pnrStatus.data.seatInfo.berth,
        noOfSeats: pnrStatus.data.seatInfo.noOfSeats,
      },
      trainInfo: {
        trainNo: pnrStatus.data.trainInfo.trainNo,
        name: pnrStatus.data.trainInfo.name,
        boarding: pnrStatus.data.boardingInfo.stationName,
        destination: pnrStatus.data.destinationInfo.stationName,
        dt: pnrStatus.data.trainInfo.dt,
      },
      passengerInfo: passengers,
    });

    let data = await travel.save();
    console.log("hi i am data", data);

    res.status(201).json({ success: true, message: "Succesful", travel });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});// Route for getting PNR status

// router.post("/:pnr/swap/request",async(req,res)=>{
//   const {pnr}=req.params;// swaper
//   const data=req.body.pnr;// to request
//   const requester=await Travel.findOne({pnrNo:pnr}).populate("user");
//   const toperson=await Travel.findOne({pnrNo:data}).populate("user");
//   // Extract email addresses
//   const requesterEmail ="rustampavr1275@gmail.com";
//   const topersonEmail = "22cs01047@iitbbs.ac.in";
//   console.log(requesterEmail);
//   console.log(topersonEmail);
//   // Define mail options
//   const mailOptions = {
//     from: { name: 'sangam', address: process.env.USER },
//     subject: "Swap Request",
//     text: "You have received a swap request.",
//     html: "<b>You have received a swap request.</b>"
//   };

//   // Send email to toperson with requester as cc
//   sendMail(topersonEmail, requesterEmail, mailOptions);
//   console.log("Succesful");
//   res.send("Fine");

// });

// router.post("/:pnrNumber/swap-seat", async (req, res) => {
// console.log("Received swap request:");
// const { pnrNumber } = req.params;
// const pnrdata = parseInt(pnrNumber, 10);

// const selectedCoaches = JSON.parse(req.body.selectedCoaches || '{}');
// let allTravels = []; // Variable to store all travel data

// try {
//     // Iterate over selectedCoaches object
//     for (const key in selectedCoaches) {
//         const coach = Object.keys(selectedCoaches[key])[0];
//         let seats = selectedCoaches[key][coach];

//         // Convert seat numbers to strings and remove leading zeros
//         seats = seats.map(seat => String(parseInt(seat, 10))); // Convert to number and back to string to remove leading zeros

//         // Use async/await to wait for the database query
//         const travelfilter = await Travel.find({
//             'seatInfo.coach': coach,
//             'seatInfo.berth': { $in: seats }, // Ensure seat numbers are treated as strings without leading zeros
//         });

//         // Concatenate the filtered travel data to the allTravels array
//         allTravels = allTravels.concat(travelfilter);
//     }

//     // Check if allTravels array is empty
//     if (allTravels.length === 0) {
//         // Render the empty.ejs file
//         res.render("empty.ejs", { pnrdata });
//     } else {
//         // Render the preferencelist.ejs file with the allTravels data
//         res.render("preferencelist.ejs", { travels: allTravels, pnrdata });
//     }
// } catch (error) {
//     console.error("Error processing swap request:", error);
//     res.status(500).send("Error processing swap request");
// }
// });

router.post("/:pnrNumber/swap-seat", async (req, res) => {
  console.log("Received swap request:");
  console.log(req.body);
  console.log(req.body.selectedCoaches);
  const { pnrNumber } = req.params;

  console.log(pnrNumber);

  const pnrdata = parseInt(pnrNumber, 10);

  console.log("PNR DATA ", pnrdata);

  // console.log(req.body);

  const selectedCoaches = req.body.selectedCoaches || "{}";
  console.log("final", selectedCoaches);

  // Convert selectedCoaches object to array format
  const selectedCoachesArray = Object.keys(selectedCoaches).map((coach) => {
    const coachObject = {};
    coachObject[coach] = selectedCoaches[coach];
    return coachObject;
  });
  console.log("final-2", selectedCoachesArray);
  try {
    // Step 1: Find the travel model based on the PNR number
    let travelModel = await Travel.findOne({ pnrNo: pnrdata });

    if (!travelModel) {
      return res
        .status(404)
        .json({ success: false, message: "Travel model not found" });
    }

    // Step 2: Extract train number and date from the travel model
    const { trainNo, dt } = travelModel.trainInfo;

    // Step 3: Find all travels matching the train number and date
    const allTravels = await Travel.find({
      "trainInfo.trainNo": trainNo,
      "trainInfo.dt": dt,
    });
    console.log(allTravels);
    // Step 4: Apply the final filter based on selected coach and seat numbers
    const filteredTravels = allTravels.filter((travel) => {
      for (const coachObject of selectedCoachesArray) {
        const coach = Object.keys(coachObject)[0];
        const seats = coachObject[coach].map((seat) =>
          String(parseInt(seat, 10))
        );

        const passengers = travel.passengerInfo.filter((passenger) => {
          return (
            passenger.currentCoach === coach &&
            seats.includes(passenger.currentBerthNo)
          );
        });

        if (passengers.length > 0) {
          return true; // At least one passenger matches the selected coach and seat numbers
        }
      }
      return false; // No passenger matches the selected coach and seat numbers
    });
    console.log("hi i am don");
    console.log(filteredTravels);
    console.log(filteredTravels.length);
    // Check if filtered travels array is empty
    if (filteredTravels.length === 0) {
      console.log("Nothing");
      return res
        .status(404)
        .json({
          success: false,
          message: "No matching travels found",
          travels: [],
        });
    }

    // Update preferences in the found travel model
    const preferenceList = req.body.preferenceList; // Assuming preferenceList is provided in the request body
    travelModel.preferences = preferenceList; // Assign the preference list to travelModel
    await travelModel.save(); // Save the updated travel model

    res
      .status(200)
      .json({
        success: true,
        message: "Travel model updated successfully",
        travels: filteredTravels,
      });
  } catch (error) {
    console.error("Error processing swap request:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing swap request" });
  }
});

export default router;
