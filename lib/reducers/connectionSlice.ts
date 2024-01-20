import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isDisconnected: boolean;
}

const initialState: WalletState = {
  address: null,
  isConnected: false,
  isDisconnected: true,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
      state.isDisconnected = !action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      state.isDisconnected = !action.payload && !state.address;
    },
  },
});

export const { setAddress, setConnected } = walletSlice.actions;
export default walletSlice.reducer;
