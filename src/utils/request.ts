import axios from 'axios';

const apiCall = async (method, url, data, headers) => {
  if (method === 'POST') {
    const call = await axios.post(url, data, { headers });
    return call.data;
  }
  const call = await axios.get(url, { headers });
  // console.log(await call, 'There There');
  return call.data;
};

const axiosGET = async (url, headers) => {
  return await apiCall('GET', url, null, headers);
};

const axiosPOST = async (url, data, headers) => {
  return await apiCall('POST', url, data, headers);
};

export { apiCall, axiosGET, axiosPOST };
