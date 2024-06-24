/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button } from "flowbite-react"; // Import Bootstrap button component

mapboxgl.accessToken = "pk.eyJ1IjoiY2hhcmxpZTEyNzUiLCJhIjoiY2x0bHVsbWV1MHg3dzJrbXlkMWkzNDMyeCJ9.DOfaBUNJU7ZuveI_D8LDbg";

const Map = () => {
  const [isFullSize, setIsFullSize] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    });

    function successLocation(position) {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([-2.24, 53.48]);
    }

    function setupMap(center) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 15
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "bottom-right");

      map.addControl(
        new MapboxGeocoder({
          accessToken: "pk.eyJ1IjoiY2hhcmxpZTEyNzUiLCJhIjoiY2x0bHVsbWV1MHg3dzJrbXlkMWkzNDMyeCJ9.DOfaBUNJU7ZuveI_D8LDbg",
          mapboxgl: mapboxgl,
          countries: "IN", // Limit results to India
          bbox: [68.1766451354, 6.75492950455, 97.4025614766, 35.4940095078] // Bounding box covering India
        })
      );

      const directions = new MapboxDirections({
        accessToken:"pk.eyJ1IjoiY2hhcmxpZTEyNzUiLCJhIjoiY2x0bHVsbWV1MHg3dzJrbXlkMWkzNDMyeCJ9.DOfaBUNJU7ZuveI_D8LDbg"
      });

      map.addControl(directions, "top-left");
    }
  }, []); // Empty dependency array to run only once on component mount

  const toggleFullScreen = () => {
    setIsFullSize(!isFullSize);
  };

  return (
    <>
    
    <div style={{ display: "flex", flexDirection: "column", height: isFullSize ? "85vh" : "65vh", width: "100vh" }}>
    <div style={{ flex: "1", position: "relative" }}>
      <div id="map" style={{padding:"45px auto ",marginLeft:"100%", height: "100%", width: "200vh" }}></div>
      <Button onClick={toggleFullScreen} variant="primary" style={{ margin:"auto 0", position: "absolute", top: "-50px", right: "10px", zIndex: 7 }}>
        {isFullSize ? "Restore Default Size" : "Expand Full Screen"}
      </Button>
    </div>
  </div>
  </>
  );
};

export default Map;
