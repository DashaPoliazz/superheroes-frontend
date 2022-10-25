import { configureStore } from "@reduxjs/toolkit";

import superheroesSlice from "./slices/superheroesSlice";
import modalSlice from "./slices/modalSlice";
import fileSlice from "./slices/fileSlice";

export const store = configureStore({
  reducer: {
    superheroes: superheroesSlice,
    modal: modalSlice,
    files: fileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
