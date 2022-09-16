import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddLocalization(token, ip)
{
  useEffect(() => {
    axios.post("http://192.168.0.34:5000/location/" + ip, {headers: {'x-access-token': token,}})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
}

function MainForm({token})
{
  const [locationData, setLocationData] = useState({2: {"ip": "", "ip_type": "", "continent": "","city": "", "country": "", "zip_code": "", "latitude": 0, "longitude": 0}});

  useEffect(() => {
		axios.get("http://192.168.0.34:5000/location", {headers: {'x-access-token': token,}})
			.then(res => {
        setLocationData(res.data)
        console.log(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

  let locationsArray = [];

  for (let key in locationData)
  {
    locationsArray.push(locationData[key]);
  }

  return (
    <div>
      {locationsArray.map((location) => (
        <div>
          {location.ip} {location.ip_type}
        <div>
        </div>
          {location.continent} {location.country} {location.city} {location.zip_code} {location.latitude} {location.longitude}
        </div>
      ))}
      <form>
        <label for="localizationInput">New location: </label>
        <input type="text" id="localizationInput" placeholder="write ip here"/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default MainForm;
