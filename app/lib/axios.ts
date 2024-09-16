import axios from "axios";

const baseURL= `${process.env.REACT_APP_BACKEND_SERVICE_URL}/api/v1`

const client = axios.create({
  baseURL:baseURL
})

export default client;