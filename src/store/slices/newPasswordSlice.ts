import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  newPassword: false,
};

export const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState,
  reducers: {
    setNewPassword: (state, action) => {
        console.log(action.payload)
      state.newPassword = action.payload;
    },
  },
});
export const { setNewPassword } = newPasswordSlice.actions;
export default newPasswordSlice.reducer;