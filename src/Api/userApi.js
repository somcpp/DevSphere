import API from "./Api";

export const getUserFeed = async () => {
  try {
    const response = await API.get('/user/feed');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch feed';
  }
};

export const viewProfile = async (id) => {
  try {
    const response = await API.get(`/user/view/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch profile';
  }
};

