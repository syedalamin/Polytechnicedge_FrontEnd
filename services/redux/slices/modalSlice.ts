import { rootReducer } from "@/app/rootReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  [modalName: string]: boolean;
}
const initialState: ModalState = {};

const modelSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modelSlice.actions;
export const injectModalReducer = rootReducer.inject(modelSlice);
