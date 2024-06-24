/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage2 } from "../firebase";
import DocViewer from "@cyntler/react-doc-viewer";
import { useMediaQuery } from 'react-responsive';
import { Button, FileInput } from "flowbite-react";
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function Schedule() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageUpload, setImageUpload] = useState(null);
  const [resumeUrls, setResumeUrls] = useState([]);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const [loading,setLoading]=useState(false);

  const imagesListRef = ref(storage2, "images/");
  const MySwal = withReactContent(Swal);
  const uploadFile =async() => {

    if (imageUpload == null){
      MySwal.fire({
        icon: "error",
        title: "Please select the file..",
        text: "File is Missing",
      });
      return;
    } 
    setLoading(true);
     await fetch("/api/send/notify-all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(""),
    });

    const imageRef = ref(storage2, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setLoading(false);
        setResumeUrls((prev) => [...prev, url]);
      });
    });
  };
   
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setResumeUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className='mt-32'>
      {currentUser && currentUser.role === 'Admin' && (
        <>
          <div className='w-[650px] mx-auto'>
            <h4>Upload Schedule</h4>
            <FileInput
              id="file-upload"
              onChange={(e) => setImageUpload(e.target.files[0])}
              name="pdfFile"
              required
            />


          <Button  onClick={uploadFile} gradientDuoTone="purpleToBlue" type="submit" outline className="w-full mt-6" disabled={loading} > {loading?"Uploading":"Submit"}</Button>
         
        
            
          </div>
        </>
      )}
      <br />
      <br />
      <div className="flex justify-center items-center h-screen">
        <div className='w-96 h-full flex col-span-3 mx-auto gap-x-4'>
          {resumeUrls.map((url, index) => (
            <object key={index} data={url} type="application/pdf" width="100%" height="100%" />
          ))}
        </div>
      </div>
      <br /><br />
    </div>
  )
}
