import Axios from 'axios';

// Create an instance of Axios with custom configuration
const axios = Axios.create({
  baseURL: 'https://jelan.pythonanywhere.com', // Base URL for API requests
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

export default axios;
