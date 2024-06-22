import React from 'react';
import axios from 'axios';

export default async function getLatlng(value){
  const options = {
    method: 'GET',
    url: 'https://map-places.p.rapidapi.com/findplacefromtext/json',
    params: {
      input: value, //'Museum of Contemporary Art Australia',
      inputtype: 'textquery',
      fields: 'formatted_address,name,rating,opening_hours,geometry'
    },
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_PLACES_API_KEY,
      'x-rapidapi-host': 'map-places.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const addr = response.data.candidates[0].formatted_address;
    console.log(addr);
        return response.data
  } catch (error) {
    console.error(error);
  }
}