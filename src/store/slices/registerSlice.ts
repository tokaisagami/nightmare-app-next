import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  isRegistered: boolean;
}

const initialState: RegisterState = {
  isRegistered: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    register: (state) => {
      state.isRegistered = true;
    },
    unregister: (state) => {
      state.isRegistered = false;
    },
  },
});

export const { register, unregister } = registerSlice.actions;
export default registerSlice.reducer;
