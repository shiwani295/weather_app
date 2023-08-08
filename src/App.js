import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import weatherimg from "../src/Asset/img/pngweather.png";
import { useState } from "react";
import { service } from "./services/service";
function App() {
  const [search, setSearch] = useState({});
  const [err, setErr] = useState(false);
  const [inputCity, setInputCity] = useState("");

  const getweatherDetail = async (cityName) => {
    try {
      const response = await service(cityName);
      if (response.statusText === "OK") {
        setErr(false);
        setSearch(response.data);
      }
    } catch (error) {
      setErr(true);
      setSearch({});
    }
  };

  const handlesubmitbtn = () => {
    getweatherDetail(inputCity);
  };

  let date = new Date();
  let day = date.toLocaleDateString();
  return (
    <>
      <div className="App">
        <div className="col-md-12">
          <div className="weatherbacground">
            <h1 className="text-white">React Weather app</h1>
            <div className="">
              <input
                type="search"
                className="form-control inputfield mt-4"
                placeholder="Enter Your City..."
                value={inputCity}
                onChange={(event) => setInputCity(event.target.value)}
                required
              />
              <button
                type="button"
                className=" form-control btn btn-dark position-relative mt-4"
                onClick={handlesubmitbtn}
              >
                Get Weather
              </button>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(search).length > 0 ? (
        <div className=" col-md-12 wetherparent">
          <div className="weatherdes">
            <img src={weatherimg} alt="img" className="weatherimg" />
            <p className="mt-3">{day}</p>
            <div className="d-flex">
              {/* {console.log(search.list)} */}
              <h5>{search?.city?.name} ,</h5>
              <p
                style={{
                  marginLeft: "5px",
                  color: "#fabb04",
                  fontWeight: "bold",
                }}
              >
                {search?.city.country}
              </p>
            </div>
            {search.list.slice(0, 1).map((item, id) => {
              return (
                <>
                  <h6 className="" key={id}>
                    {item?.main?.temp.toFixed(2)}°C
                  </h6>

                  {item.weather.map((data) => {
                    const weathericon = data.icon;
                    const icon = `https://openweathermap.org/img/wn/${weathericon}@2x.png`;
                    return (
                      <div className="weatheinfo">
                        <img src={icon} alt="weathericon"></img>
                        <h6 className="text-center">Weather- {data.main}</h6>
                        <h6>Weather Des.- {data.description}</h6>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {err && (
            <div className="wetherparent">
              <div className="weatherdes">
                {err && (
                  <img src={weatherimg} alt="img" className="weatherimg" />
                )}
                <h4>{err && "City Not Found!"}</h4>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
