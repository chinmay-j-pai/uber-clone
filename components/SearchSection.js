"use client"
import React, { useContext, useEffect, useState } from 'react'
import InputItem from './InputItem'
import L from "leaflet";
import CarListOptions from './CarListOptions';
import { SourceLocContext } from '@/context/SourceLocContext';
import { DestLocContext } from '@/context/DestLocContext';
import { MainToggleContext } from '@/context/MainToggleContext';


export default function SearchSection() {

  const { sourceLoc, setSourceLoc } = useContext(SourceLocContext);
  const { destLoc, setDestLoc } = useContext(DestLocContext);
  const [dist, setDist] = useState(null);
  const {mainToggle, setMainToggle} = useContext(MainToggleContext);


  console.log("SearchSection");
  console.log(sourceLoc);
  console.log(destLoc);
  console.log(dist);

  useEffect(() => {
    if(sourceLoc && destLoc){

      const sourceLatLng = L.latLng(sourceLoc.lat, sourceLoc.lng);
      const destlatLng = L.latLng(destLoc.lat, destLoc.lng);
      const distanceInMeters = sourceLatLng.distanceTo(destlatLng);
      const distanceInKm = distanceInMeters / 1000;
      setDist(distanceInKm);
    }

  }, [mainToggle, sourceLoc, destLoc]);


  return (
    <div>
      <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
        <p className="text-[20px] font-bold">Get a ride</p>

        <InputItem type="source" />
        <InputItem type="dest" />

        <button
          className='p-3 bg-black w-full mt-5 text-white rounded-lg'
          onClick={() => { setMainToggle(!mainToggle) }}
        >
          Search
        </button>

      </div>
      <CarListOptions dist={dist}/>
      {/* {dist && <CarListOptions dist={dist}/>} */}
    </div>
  )
}
