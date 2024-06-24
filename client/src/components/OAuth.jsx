/* eslint-disable no-unused-vars */
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app1 } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function OAuth() {
  const [swalProps, setSwalProps] = useState({});
  const [type, setType] = useState("Faculty");
  const auth = getAuth(app1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleRoleSelection = async (role) => {
    // Handle the selected role here
    setType(role);
    console.log("Selected role:", role);
    try {
      const provider = new GoogleAuthProvider();
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const emailVerify = resultsFromGoogle.user.email;

      if (!emailVerify.endsWith("@iitbbs.ac.in")) {
        MySwal.fire({
          icon: "error",
          title: "Wrong Credentials...",
          text: "Please Enter a Valid Institute Email id!",
        });
        return;
      }

      // Ask for the secret key for admin login
      if (role === "Admin") {
        const { value: secretKey } = await MySwal.fire({
          title: 'Enter Secret Key',
          input: 'password',
          inputPlaceholder: 'Enter your secret key',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
        });

        if (secretKey !== '1275') { // Replace 'YOUR_SECRET_KEY' with the actual secret key
          MySwal.fire({
            icon: "error",
            title: "Wrong Secret Key",
            text: "Please Enter the Correct Secret Key!",
          });
          return;
        }
      }

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          role: role, // Pass the selected role here
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 404) {
        console.log("ji");
        MySwal.fire({
          icon: "error",
          title: "Wrong Credentials...",
          text: "Please Enter a Valid Credtionals Role and Email Id!",
        });
      }
      if (res.ok) {
        console.log("go");
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Wrong Credentials...",
        text: "Please Enter a Valid Institute Email id!",
      });
      console.log(error);
    }
  };

  const handleGoogleClick = async () => {
    await Swal.fire({
      title: "Select your role",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Faculty",
      showDenyButton: true,
      denyButtonText: "Student",
      showConfirmButton: true,
      confirmButtonText: "Admin",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // User selected Admin role
        handleRoleSelection("Admin");
      } else if (result.isDenied) {
        // User selected Student role
        handleRoleSelection("Student");
      } else {
        // User canceled or closed the dialog
        handleRoleSelection(null);
      }
    });
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
