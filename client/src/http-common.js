import axios from 'axios';

//Define base URL of API services
export default axios.create({
  // baseURL: 'http://localhost:3001/',
  baseURL: '',
  headers: {
    'Content-type': 'application/json',
  },
});
