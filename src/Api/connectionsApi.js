import API from "./Api";




export const sendConnectionRequest = async (id) => {
  try {
    const response = await API.post(`/request/send/intrested/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to send connection request';
  }
};

export const getOutgoingRequests = async() => {
  try {
    const response = await API.get(`/request/outgoing`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get outgoing requests';
  }
}

export const getIncomingRequests = async() => {
  try {
    const response = await API.get(`/user/requests/pending`)
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get connection requests';
  }
}

export const reviewRequest = async ({id,status}) => {
  try {
    //status = either accepted / rejected
    //id = _id of the card that the user is viewing
    const response = await API.post(`/request/review/${status}/${id}`)
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || `Failed to post mark ${status}`;
  }
}

export const getAllConnections = async() => {
  try {
    const response = await API.get("/user/connections");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch connections';
  }
}