"use client";
import React from "react";
// import { Map } from "react-map-gl/mapbox'";
// import "mapbox-gl/dist/mapbox-gl.css";
import FilterPanel from "./FilterPanel/FilterPanel";
import DetailPanel from "./DetailPanel/DetailPanel";

// const accessToken =
//   "sk.eyJ1Ijoia2F6aWFobWVkOTEiLCJhIjoiY2x2NDNoeXgyMDUzZzJxbHM5dnN6NmYxNyJ9.fB4rtI1jzkdGpf7b5VbkHw";

const LocationMap = () => {
  return (
    <div className="flex-auto flex-row">
      <FilterPanel />
      {/* <Map
        mapboxAccessToken="pk.eyJ1Ijoia2F6aWFobWVkOTEiLCJhIjoiY2x2MTd6am5pMDRkcTJrbnN5aWtiOHhkYSJ9.dIALkgtS_G_9f1T3oDWHXA"
        initialViewState={{
          latitude: 22.36038,
          longitude: 91.82684,
          zoom: 15,
        }}
        style={{ width: "100%", height: 660 }}
        mapStyle="mapbox://styles/kaziahmed91/clv18bzn6018l01nrc800dcna"
      /> */}
      <DetailPanel
        id="1"
        title="Well City Center"
        location="123 GEC Circle"
        type="Mixed-use"
      />
    </div>
  );
};

export default LocationMap;
