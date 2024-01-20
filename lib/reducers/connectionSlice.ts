import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConnectionState {
  isConnected: boolean;
}

const initialState: ConnectionState = {
  isConnected: false,
};

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    connect: (state) => {
      state.isConnected = true;
    },
    disconnect: (state) => {
      state.isConnected = false;
    },
  },
});

export const { connect, disconnect } = connectionSlice.actions;
export default connectionSlice.reducer;
