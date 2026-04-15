import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  formData: {
    gender: 'male',
    skills: [],
    institution: '',
    major: '',
    about: '',
    photoURL: '',
    experience: [],
    location: '',
    phone: '',
    linkedin: '',
    github: '',
    twitter: '',
    interests: [],
  },
  isLoading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    toggleSkill: (state, action) => {
      const skill = action.payload;
      const index = state.formData.skills.indexOf(skill);
      if (index === -1) {
        state.formData.skills.push(skill);
      } else {
        state.formData.skills.splice(index, 1);
      }
    },
    toggleInterest: (state, action) => {
      const interest = action.payload;
      const index = state.formData.interests.indexOf(interest);
      if (index === -1) {
        state.formData.interests.push(interest);
      } else {
        state.formData.interests.splice(index, 1);
      }
    },
    addExperience: (state, action) => {
      state.formData.experience.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { index, data } = action.payload;
      state.formData.experience[index] = { ...state.formData.experience[index], ...data };
    },
    removeExperience: (state, action) => {
      state.formData.experience.splice(action.payload, 1);
    },
    resetOnboarding: (state) => {
      state.step = 1;
      state.formData = {
        gender: 'male',
        skills: [],
        institution: '',
        major: '',
        about: '',
        photoURL: '',
        experience: [],
        location: '',
        phone: '',
        linkedin: '',
        github: '',
        twitter: '',
        interests: [],
      };
      state.error = null;
    },
  },
});

export const {
  setStep,
  updateFormData,
  toggleSkill,
  toggleInterest,
  addExperience,
  updateExperience,
  removeExperience,
  resetOnboarding,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;