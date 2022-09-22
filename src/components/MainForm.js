import React, { useState, useEffect } from 'react'
import axios from 'axios'
import trash from './images/trash.png'
import sort from './images/sort.png'
import './App.css'


function MainForm({token, loginRedirect})
{
  const [ip, setIp] = useState("");
  const [locationData, setLocationData] = useState({0: {"ip": "", "ip_type": "", "continent": "","city": "", "country": "", "zip_code": "", "latitude": 0, "longitude": 0}});
  const [message, setMessage] = useState("");
  const [renderArray, setRenderArray] = useState([]);
  const [sortPropertyType, setSortPropertyType] = useState("id");

  document.body.style = 'background: antiquewhite;';

  useEffect(() => getLocations(), []);
  useEffect(() => sortArray(sortPropertyType), [sortPropertyType, locationData]);

  const sortArray = propertyType => {
    const properties = {
      id: 'id',
      ip: 'ip',
      ip_type: 'ip_type',
      continent: 'continent',
      country: 'country',
      city: 'city',
      zip_code: 'zip_code',
      latitude: 'latitude',
      longitude: 'longitude',
    };
    // insert json data into array
    let locationsArray = [];
    for (let key in locationData)
      locationsArray.push(locationData[key]);

    const sortProperty = properties[propertyType];
    const sortedLocationsArray = [...locationsArray].sort((a, b) => a[sortProperty] > b[sortProperty] ? 1 : -1);
    setRenderArray(sortedLocationsArray);
  }

  const submitHandler = e => {
    e.preventDefault();
    AddLocation(token, ip);
  }

  async function AddLocation(token, ip)
  {
    let response = await fetch("https://api-sofomo.herokuapp.com/location/" + ip,
    {
      method: 'POST',
      headers: {'x-access-token': token,},
    }).then(response => response.json());
    setMessage(response.response);
    getLocations();
  }

  function getLocations()
  {
    axios.get("https://api-sofomo.herokuapp.com/location", {headers: {'x-access-token': token,}})
      .then(res => {
        setLocationData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function deleteLocation(id)
  {
    axios.delete("https://api-sofomo.herokuapp.com/location/" + id, {headers: {'x-access-token': token,}})
      .then(res => {
        setMessage(res.data.response);
        getLocations();
      })
  }

  return (
    <div className="body">
      <div className="header" key="header">
        <span className="smallword"></span>
        <span className="mediumword">IP<img src={sort} onClick={() => setSortPropertyType("ip")} /></span>
        <span className="mediumword">IP type<img src={sort} onClick={() => setSortPropertyType("ip_type")} /></span>
        <span className="mediumword">Continent<img src={sort} onClick={() => setSortPropertyType("continent")} /></span>
        <span className="mediumword">Country<img src={sort} onClick={() => setSortPropertyType("country")} /></span>
        <span className="mediumword">City<img src={sort} onClick={() => setSortPropertyType("city")} /></span>
        <span className="mediumword">Zip code<img src={sort} onClick={() => setSortPropertyType("zip_code")} /></span>
        <span className="longword">Latitude<img src={sort} onClick={() => setSortPropertyType("latitude")} /></span>
        <span className="longword">Longitude<img src={sort} onClick={() => setSortPropertyType("longitude")} /></span>
        <span className="smallword"></span>
        <button onClick={loginRedirect}>LogOut</button>
      </div>
      {renderArray.map((location, nr) => (
        <div className="record" key={location.id}>
          <span className="smallword">{nr+1}:</span>
          <span className="mediumword">{location.ip}</span>
          <span className="mediumword">{location.ip_type}</span>
          <span className="mediumword">{location.continent}</span>
          <span className="mediumword">{location.country}</span>
          <span className="mediumword">{location.city}</span>
          <span className="mediumword">{location.zip_code}</span>
          <span className="longword">{location.latitude}</span>
          <span className="longword">{location.longitude}</span>
          <img src={trash} onClick={() => deleteLocation(location.id)}/>
        </div>
      ))}
      <form className="addForm" onSubmit={submitHandler}>
        <label htmlFor="localizationInput">New location: </label>
        <input type="text" id="localizationInput" placeholder="write ip here"
          onChange={e => setIp(e.target.value)}/>
        <button type="submit">Add</button>
        <div className="message">{message}</div>
      </form>
    </div>
  );
}

export default MainForm;
