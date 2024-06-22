import React from "react";
import axios from "axios";
export default async function getAutocompleteData(value) {

    const options = {
        method: "GET",
        url: "https://map-places.p.rapidapi.com/queryautocomplete/json",
        params: {
            input: value,
            radius: "50000",
        },
        headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_PLACES_API_KEY,
            "x-rapidapi-host": "map-places.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        const locationData = response.data.predictions;

        let temp = [];
        locationData.map((item) => {
            temp = [...temp, item.description];
        });
        return temp;

    } catch (error) {
        console.error(error);
        console.log("hello");
    }

}

