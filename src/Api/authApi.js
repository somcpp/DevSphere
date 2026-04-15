import API from "./Api";

export const signupUser = async (userData) => {
  try {
    const response = await API.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed';
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await API.post('/auth/login', userData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.patch('/profile/edit', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Profile update failed';
  }
};

export const logoutUser = async () => {
  try {
    await API.post('/auth/logout');
  } catch (error) {
    throw error.response?.data?.message || 'Logout failed';
  }
};