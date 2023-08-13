import axios from 'axios';

const apiCall = async (method, url, data, extra = null) => {
  if (method === 'POST') {
    return await axios.post(url, data, { ...extra });
  }
  return await axios.get(url, { ...data });
};

const axiosGET = async (url, data = null) => {
  return apiCall('GET', url, data);
};

const axiosPOST = async (url, data, extra = null) => {
  return apiCall('POST', url, data, extra);
};

export { axiosGET as GET, axiosPOST as POST };
