import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Datepicker } from "flowbite-react";
// import Map from './../components/map';

export default function BookTrip() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const checkoutHandler = async (amount) => {
    // Fetch the Razorpay key and initiate the payment process
    console.log("request");
    // const response = await fetch("/api/pay/get-key");
    // console.log(response);
    
    const response = await fetch(`/api/pay/get-key`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const { key } = await response.json();
   // console.log(response);
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
        handleSubmit();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleDatepickerChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      
      const finalData = {
        ...formData,
        date: selectedDate,
        userId: currentUser._id,
        paymentType: type,
      };

      const res = await fetch("/api/bus/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (data.status !== 201) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid gap-0">
        <div
          className="h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/300473/banner_banner.jpg)",
          }}
        >
          <div className="flex flex-col gap justify-center items-cen h-ful bg-gray-900 bg-opacity-55">
            <div className="p-4  bg-gradient-to-r from-blue-700 via-white to-blue-900 rounded-lg text-black font-bold text-2xl">
              <div className="flex flex-col items-center">
                Secure your reservation.
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen mt-20">
          <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <Link to="/" className="font-bold dark:text-white text-4xl">
                <span className="px-2 py-1 bg-gradient-to-r  from-blue-700 via-white to-blue-800 rounded-lg text-black font-bold ">
                  Track your Journey
                </span>
                &nbsp; <br />
                <br /> IIT Bhubaneswar
              </Link>
              <p className="text-sm mt-5">
                Welcome to our esteemed College Services. Experience the
                convenience of our platform designed to cater to your academic
                needs. Please proceed by completing the form below.
              </p>
              {/* <Map/> */}
            </div>
            <div className="flex-1">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="md:flex ">
                  <div className="mr-2">
                    <Label value="Source" />
                    <TextInput
                      type="text"
                      placeholder="BHR-IIT BBS"
                      id="source"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label value="Destination" />
                    <TextInput
                      type="text"
                      placeholder="Shree jagannatha Temple"
                      id="destination"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label value="Bus No. " />
                  <TextInput
                    type="Number"
                    placeholder="0"
                    id="busNo"
                    onChange={handleChange}
                    min={0}
                  />
                </div>
                <div>
                  <Label value="Date" />
                  <Datepicker
                    id="datepicker"
                    name="selectedDate"
                    onChange={handleChange}
                    value={selectedDate}
                    onSelectedDateChanged={handleDatepickerChange}
                  />
                </div>

                <Button
                  gradientDuoTone="purpleToBlue"
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setType("PayNow");
                    checkoutHandler(50);
                  }}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
                <Button
                  gradientDuoTone="tealToLime"
                  type="submit"
                  disabled={loading}
                  onClick={() => {
                    setType("PayLater");
                  }}
                  outline
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Pay Later"
                  )}
                </Button>
              </form>

              {errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
