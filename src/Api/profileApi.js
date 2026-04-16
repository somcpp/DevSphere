import API from "./Api";

export const viewloggedInUser = async() => {
  try {
    const res = await API.get("/profile/view");
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get User Details';
  }
}

export const deleteProfile = async() => {
  try {
    const res = await API.delete("/profile/delete");
  } catch (error) {
    throw error.response?.data?.message || 'Failed to Delete User';
  }
}

export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.patch('/profile/edit', profileData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Profile update failed';
  }
};