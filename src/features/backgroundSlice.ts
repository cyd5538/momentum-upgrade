import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
  bgImage: string;
}

const storedBgImage = localStorage.getItem('bgImage');

const initialState: BackgroundState = {
  bgImage: storedBgImage || '',
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBgImage: (state, action: PayloadAction<string>) => {
      state.bgImage = action.payload;
      localStorage.setItem('bgImage', action.payload);
    },
  },
});

export const { setBgImage } = backgroundSlice.actions;
export default backgroundSlice.reducer;
