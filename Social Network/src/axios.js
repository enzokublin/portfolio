import axios from "axios";

var instance = axios.create({
  xsrfCookieName: "spicedbearstoken",
  xsrfHeaderName: "csrf-token"
});

export default instance;
