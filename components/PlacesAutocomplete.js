"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import getAutocompleteData from "./GetAutocomplete";
import getLatlng from "./GetLatLng";

export default function PlacesAutocomplete() {
  const [autocompleteSource, setAutocompleteSource] = useState(["apple","orange","banana"]);
  const [autocompleteDest, setAutocompleteDest] = useState(["apple","orange","banana"]);
  const [sourceValue, setSourceValue] = useState("");
  const [destValue, setDestValue] = useState("");
  const [toggleSource, setToggleSource] = useState(0);
  const [toggleDest, setToggleDest] = useState(0);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const [sourceLatlng, setSourceLatlng] = useState(0);
  const [destLatlng, setDestLatlng] = useState(0);

  const [source, setSource] = useState({});
  const [dest, setDest] = useState({});


// useEffect(() => {

//   getAutocompleteData(sourceValue)
//     .then((addressData) => {

//       setAutocompleteSource(addressData);
//     });

// }, [toggleSource]);

// useEffect(() => {

//   getAutocompleteData(destValue)
//     .then((addressData) => {

//       setAutocompleteDest(addressData);
//     });

// }, [toggleDest]);

useEffect(() => {

  getLatlng(sourceValue)
    .then((place) => {

      setSource({
        lat:place.candidates[0].geometry.location.lat,
        lng:place.candidates[0].geometry.location.lng,
        name:place.candidates[0].formatted_address,
        label:place.candidates[0].name
      });
    });

}, [sourceLatlng]);

useEffect(() => {
  // console.log("hello")
  getLatlng(destValue)
    .then((place) => {
      console.log(place);
      setDest({
        lat:place.candidates[0].geometry.location.lat,
        lng:place.candidates[0].geometry.location.lng,
        name:place.candidates[0].formatted_address,
        label:place.candidates[0].name
      });
    });

}, [destLatlng]);

function handleSourceChange(content) {
  // console.log(content);
  
    setToggleSource(!toggleSource);
    setSourceValue(content.target.value);
    setShowSourceSuggestions(true);

}

function handleDestChange(content) {
  // console.log(content);
  
    setToggleDest(!toggleDest);
    setDestValue(content.target.value);
    setShowDestSuggestions(true);


}

const handleSourceClick = (e) => {
  
    setSourceValue(e.target.innerText);
    // setAutocompleteSource([]);
    setShowSourceSuggestions(false);
    setSourceLatlng(!sourceLatlng);

};

const handleDestClick = (e) => {
  
    setDestValue(e.target.innerText);
    // setAutocompleteDest([]);
    setShowDestSuggestions(false);
    setDestLatlng(!destLatlng);

};

const handleSourceBlur = (e) => {
  
  setTimeout(() => {
    
    setShowSourceSuggestions(false);
    
  }, 100);
};

const handleDestBlur = (e) => {
  
  setTimeout(() => {
    
    setShowDestSuggestions(false);
  }, 100);
};

const listSourceItems = <ul className="absolute z-10 w-full bg-white border rounded-md mt-1">
{autocompleteSource.map((item, index) => {
  return(
    <li 
    name="source"
    key={index}
    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    onMouseDown={handleSourceClick}
    >
    {item}
    </li>
    )
    }
    )}
</ul>

const listDestItems = <ul className="absolute z-10 w-full bg-white border rounded-md mt-1">
{autocompleteDest.map((item, index) => {
  return(
    <li 
    name="dest"
    key={index}
    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    onMouseDown={handleDestClick}
    >
    {item}
    </li>
    )
    }
    )}
</ul>

  return (
    <div>
      <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
        <Image src="/source.png" width={15} height={15} alt="source-icon" />
        <input
        name="source"
          type="text"
          placeholder="Pickup Location"
          value={sourceValue}
          onChange={handleSourceChange}
          onBlur={handleSourceBlur}
          className="bg-transparent w-full outline-none"
        />


      </div>
        { showSourceSuggestions && sourceValue && listSourceItems}

      <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
        <Image src="/dest.png" width={15} height={15} alt="source-icon" />
        <input
        name="dest"
          type="text"
          placeholder="Dropoff Location"
          value={destValue}
          onChange={handleDestChange}
          onBlur={handleDestBlur}
          className="bg-transparent w-full outline-none"
        />


      </div>
         {showDestSuggestions && destValue && listDestItems}
    </div>
  );
}
