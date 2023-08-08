import axios from "axios";

export const service = (cityName) => {
  const apiURL =
    process.env.REACT_APP_URL +
    cityName +
    "&units=metric&appid=" +
    process.env.REACT_APP_MY_APP_KEY;
  return axios.get(apiURL);
};
