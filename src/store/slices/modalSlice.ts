import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  isModal: boolean;
}

const initialState: IModalState = {
  isModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state: IModalState) => {
      state.isModal = !state.isModal;
    },
  },
});

export const modaSliceActions = modalSlice.actions;
export default modalSlice.reducer;
