/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/API";
import { Label, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

function SeatSelectionForm() {
  const { pnrNumber } = useParams();
  console.log(pnrNumber);
  const navigate = useNavigate();
  const [selectedCoaches, setSelectedCoaches] = useState({});
  const [coachInput, setCoachInput] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { theme } = useSelector((state) => state.theme);
  const handleOnClick = async () => {
    try {
      const preferenceList = [];
      for (const coach in selectedCoaches) {
        selectedCoaches[coach].forEach((seatNo) => {
          preferenceList.push({ coach, seatNo });
        });
      }

    //   const response = await API.post(`/pnr/${pnrNumber}/swap-seat`, {
    //     selectedCoaches: JSON.stringify(selectedCoaches),
    //     preferenceList: preferenceList,
    //   });
    const res = await fetch(`/api/pnr/${pnrNumber}/swap-seat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedCoaches: selectedCoaches,
          preferenceList: preferenceList,
        }),
      });
      
      
      const response = await res.json();
       console.log(response);
      if (response.success) {
        console.log(response.success);
        console.log(response.message);
        navigate(`/SwapResults/${pnrNumber}`, { state: { results: response.travels } });
      } else {
        console.log("Unsuccessful response", response.message);
      }
    } catch (error) {
      console.error("Error processing swap request:", error);
    }
  };

  const handleAddCoachBtnClick = () => {
    if (coachInput && selectedSeats.length > 0) {
      setSelectedCoaches((prevState) => ({
        ...prevState,
        [coachInput]: selectedSeats,
      }));
      setCoachInput("");
      setSelectedSeats([]);
    } else {
      alert("Please enter coach and select seats.");
    }
  };

  const updateSelectedCoachesInput = () => {
    const selectedCoachesArray = [];
    for (const coach in selectedCoaches) {
      selectedCoachesArray.push({ [coach]: selectedCoaches[coach] });
    }
    return JSON.stringify(selectedCoachesArray);
  };

  const handleCoachInputChange = (event) => {
    const coach = event.target.value;
    setCoachInput(coach);
    setSelectedSeats([]);
  };

  const handleSeatCheckboxChange = (event) => {
    const seatNumber = event.target.value;
    if (event.target.checked) {
      setSelectedSeats((prevSeats) => [...prevSeats, seatNumber]);
    } else {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((seat) => seat !== seatNumber)
      );
    }
  };

  return (
    <div className="text-center">
      <div className="mx-auto px-2 py-2.5 my-5 w-[550px] rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
        <p className="text-3xl font-bold text-white">
          Coach and Seat Selection
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="mt-4">
        <input
          type="hidden"
          name="selectedCoaches"
          value={updateSelectedCoachesInput()}
        />

        <div
          className="h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://media.cntraveler.com/photos/6346fbddb67e8cc6076f4097/16:9/w_8399,h_4724,c_limit/Airplane_GettyImages-1208492701.jpg)",
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center h-full bg-gray-900 bg-opacity-50 p-4 rounded-lg">
            <div className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              <div className="form-group">
                <label htmlFor="coachInput" className="text-[20px]">
                Enter Your  Coach:{" "}
                </label>
                <br />
                <input
                  type="text"
                  className="text-black border-gray-300 rounded-md px-4 py-2 w-[500 h-12 text-center mt-2 focus:outline-none"
                  id="coachInput"
                  name="coach"
                  value={coachInput}
                  onChange={handleCoachInputChange}
                  placeholder="Enter coach (e.g., A1)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group mt-5  text-center">
          <label hidden>Select Seat(s):</label>
       

          <br />

          {coachInput && (
            <>
               <div className=" ">
               <Button
                 gradientDuoTone="purpleToPink"
                 type="submit"
                 outline
                 className="mx-auto w-40 md:w-96"
               >
                 Select Seats(s) : {" "}
               </Button>
             </div>
            <div className="mx-28 flex flex-row flex-wrap mt-6">
                
              {[...Array(100).keys()].map((i) => {
                const seatNumber = ("0" + (i + 1)).slice(-2);
                return (
                  <div
                    key={i}
                    className="form-check form-check-inline mr-4 mb-4 p-1"
                  >
                    <input
                      className="form-check-input hover:scale-150 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      id={`seat${seatNumber}`}
                      name="seats"
                      value={seatNumber}
                      onChange={handleSeatCheckboxChange}
                    />
                    <label
                      className=" form-check-label mx-4 ms-2 text-s font-medium text-gray-900 dark:text-gray-300"
                      htmlFor={`seat${seatNumber}`}
                    >
                      Seat {seatNumber}
                    </label>
                  </div>
                );
              })}
            </div>
            </>
          )}
        </div>
        <div className="form-group">
          <Button
            className="mx-auto my-5  w-f md:w-96"
            gradientDuoTone="purpleToPink"
            type="button"
            onClick={handleAddCoachBtnClick}
            outline
          >
            Add Coach and Seats{" "}
          </Button>
          {/* <button type="button" className="btn btn-primary" onClick={handleAddCoachBtnClick}>Add Coach and Seats</button> */}
        </div>
        <hr className="bg-gray-200 border-spacing-1 dark:bg-gray-700 mb-8 " />

        <div className="mt-3">
          <h1 className="mb-7 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
            Selected{" "}
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              Coach
            </mark>{" "}
            and{" "}
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              Seats{" "}
            </mark>{" "}
          </h1>

          <div className="overflow-x-auto mx-10 md:mx-80 rounded-lg border-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[3px]">
  <div className="h-full w-full bg-white dark:bg-blue-900 rounded-lg">
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-800">
          <th className="px-4 py-2">Coach</th>
          <th className="px-4 py-2">Seats</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(selectedCoaches).map(([coach, seats]) => (
          <tr
            key={coach}
            className={`transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === 'dark' ? 'text-white font-bold' : 'text-black'}`}
          >
            <td className="border px-4 py-2">{coach}</td>
            <td className="border px-4 py-2">{seats.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </div>

        <div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <svg
                className="w-4 h-4 text-gray-700 dark:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <Button
          className="mx-auto my-5"
          gradientDuoTone="purpleToPink"
          type="submit"
          onClick={handleOnClick}
          outline
        >
          SWAP REQUEST{" "}
        </Button>
        {/* <button type="submit" className="btn btn-success" onClick={handleOnClick}>SWAP REQUEST</button> */}
      </form>
    </div>
  );
}

export default SeatSelectionForm;
