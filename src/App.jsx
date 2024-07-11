import React, { useRef, useState, useEffect } from 'react'
import { WiHumidity } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import "./App.css"
import { IoIosSearch } from "react-icons/io";

const App = () => {
  const [city, setcity] = useState("Enter city name")
  const cityref = useRef(null)
  const [cityTempRecord, setCityTempRecord] = useState(
    {
      temperature: "",
      msg: "",
      humidity: "",
      windspeed: "",
      image: ""
    }
  )
  const [dataLoaded, setDataLoaded] = useState(false);

  let handleChange = (e) => {
    cityref.current.style.outline = 'none';
    setcity(e.target.value)
  }

  let handleClick = async () => {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9033a0edf2msh8e99f2dd073dd45p1789d8jsn96db6c5f4910',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      let result = await response.json();
      console.log(result)
      let temperature = result.current_observation.condition.temperature
      let msg = result.forecasts[0].text
      let humidity = result.current_observation.atmosphere.humidity
      let windspeed = result.current_observation.wind.speed

      console.log(temperature, humidity, msg, windspeed)
      setCityTempRecord({
        temperature: temperature,
        msg: msg,
        humidity: humidity,
        windspeed: windspeed
      });

      // let temperature = result.data.temp
      // let msg = result.data.aqi_remark
      // let humidity = result.data.humidity
      // let windspeed = result.data.wind
      // let image = result.data.bg_image

      // console.log(temperature, humidity, msg, windspeed)
      // setCityTempRecord({
      //   temperature: temperature,
      //   msg: msg,
      //   humidity: humidity,
      //   windspeed: windspeed,
      //   image: image
      // });
      setDataLoaded(true)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (Object.values(cityTempRecord).some(value => value !== "")) {
      setDataLoaded(true);
    }

  }, [cityTempRecord]);

  return (
    <>
      <div className="bg-blue-400 w-full h-screen flex justify-center items-center" >
        <div className=' w-96 bg-white border rounded-2xl'>
          <h2 className=' text-blue-400 text-xl font-bold h-12 flex items-center pl-3'>
            Weather App
          </h2>
          <div className='h-0.5 bg-slate-300'></div>
          <div className='flex items-center justify-center'>
            <input className='border-2 border-slate-300 rounded-full text-slate-300 pl-2 font-bold w-3/4 h-12 mt-7 mb-2 ' ref={cityref} onChange={handleChange} value={city} />
            <button className='ml-3 mt-4 border-2 rounded-full text-slate-400' onClick={() => handleClick()}><IoIosSearch className='search-icon' /></button>
          </div>
          {dataLoaded && <div>
            <div>
              {/* <div className='flex justify-center'><img className="h-40 w-40" src={cityTempRecord.image} alt="weather image" /></div> */}
              {(cityTempRecord.msg).toLowerCase() == "partly cloudy" && <div className='flex justify-center'><img className="h-40 w-40" src="https://cdn-icons-png.freepik.com/256/14270/14270060.png" alt="partly cloudy" /></div>}
              {(cityTempRecord.msg).toLowerCase() == "sunny" && <div className='flex justify-center'><img className="h-40 w-40" src="https://icons.veryicon.com/png/o/weather/weather-7/sunny-3.png" alt="sunny" /></div>}
              {(cityTempRecord.msg).toLowerCase() == "cloudy" && <div className='flex justify-center'><img className="h-40 w-40" src="https://cdn-icons-png.flaticon.com/256/1542/1542627.png" alt="cloudy" /></div>}
              {(cityTempRecord.msg).toLowerCase() == "mostly clear" && <div className='flex justify-center'><img className="h-40 w-40" src="https://cdn-icons-png.freepik.com/512/3032/3032894.png" alt="mostly clear" /></div>}
              {(cityTempRecord.msg).toLowerCase() == "clear" && <div className='flex justify-center'><img className="h-40 w-40" src="https://cdn-icons-png.flaticon.com/512/3222/3222807.png" alt="clear" /></div>}
              {(cityTempRecord.msg).toLowerCase() == "scattered showers" && <div className='flex justify-center'><img className="h-40 w-40" src="https://static-00.iconduck.com/assets.00/weather-showers-scattered-icon-2048x1909-qbv4pwjf.png" alt="clear" /></div>}
            </div>
            <div className='flex text-center flex-col'>
              <h3 className='text-4xl mb-2'> {cityTempRecord.temperature}&deg;c</h3>
              <h3 className='text-4xl mb-5'> {cityTempRecord.msg}</h3>
            </div>
            <div className='flex mb-5'>
              <div className='w-1/2 flex'>
                <WiHumidity className='icon-size' />
                <div className='flex flex-col'>
                  <div>{cityTempRecord.humidity} &#x25;</div>
                  <div>Humidity</div>
                </div>
              </div>
              <div className='w-1/2 flex'>
                <BiWind className='icon-size' />
                <div className='flex flex-col'>
                  <div>{cityTempRecord.windspeed} km/hr</div>
                  <div>Wind Speed</div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}


export default App
