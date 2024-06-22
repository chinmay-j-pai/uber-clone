"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import getAutocompleteData from "./GetAutocomplete";
import getLatlng from "./GetLatLng";

import { SourceLocContext } from "@/context/SourceLocContext";
import { DestLocContext } from "@/context/DestLocContext";

export default function InputItem({ type }) {
    const [autocomplete, setAutocomplete] = useState([]);
    const [value, setValue] = useState("");
    const [toggle, setToggle] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [latlng, setLatlng] = useState(0);

    const { sourceLoc, setSourceLoc } = useContext(SourceLocContext);
    const { destLoc, setDestLoc } = useContext(DestLocContext);
    const [placeHolder, setPlaceHolder] = useState("");

    useEffect(() => {
        type == "source"
            ? setPlaceHolder("Pickup Location")
            : setPlaceHolder("Dropoff Location")
    })

    useEffect(() => {
        if (value) {

            getAutocompleteData(value)
                .then((addressData) => {

                    setAutocomplete(addressData);
                });
        }

    }, [toggle]);

    useEffect(() => {
        if (autocomplete) {

            getLatlng(value)
                .then((place) => {
                    if (place && place.status === 'OK' && place.candidates[0].geometry && place.candidates[0].geometry.location) {

                        if (type == "source") {

                            setSourceLoc({
                                lat: place.candidates[0].geometry.location.lat,
                                lng: place.candidates[0].geometry.location.lng,
                                name: place.candidates[0].formatted_address
                            });
                        } else {
                            setDestLoc({
                                lat: place.candidates[0].geometry.location.lat,
                                lng: place.candidates[0].geometry.location.lng,
                                name: place.candidates[0].formatted_address
                            });
                        }
                    }
                });
        }

    }, [latlng]);

    function handleChange(content) {


        setToggle(!toggle);
        setValue(content.target.value);
        setShowSuggestions(true);
    }

    const handleClick = (e) => {

        setLatlng(!latlng);
        setValue(e.target.innerText);
        setAutocomplete([]);
        setShowSuggestions(false);

        // console.log("InputItem");
        // console.log(source);
        // console.log(dest);


    };

    const handleBlur = (e) => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    const listItems = <ul className="absolute z-10 w-full bg-white border rounded-md mt-1">
        {autocomplete.map((item, index) => {
            return (
                <li
                    name=""
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onMouseDown={handleClick}
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

                    type="text"
                    placeholder={placeHolder}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-transparent w-full outline-none"
                />
            </div>
            {showSuggestions && value && listItems}

        </div>
    );
}
