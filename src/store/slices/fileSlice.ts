import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fileService } from "../../services/FileService";
import { IFileResponse } from "../../types/FileResponse";

interface ImageOptions {
  imageToSet: File;
  superheroId: string;
}

interface InitialState {
  currentImage: string | null;
  isLoading: boolean;
}

export const setCurrentImage = createAsyncThunk(
  "api/loadImage",
  async (options: ImageOptions) => {
    const response = await fileService.setImage(
      options.imageToSet,
      options.superheroId,
    );

    return response.data;
  },
);

const initialState = {
  currentImage: null,
  isLoading: false,
};

const fileSlice = createSlice({
  name: "api/files",
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(setCurrentImage.pending, (state: InitialState) => {
      state.isLoading = true;
    });
    builder.addCase(
      setCurrentImage.fulfilled,
      (state: InitialState, action: PayloadAction<IFileResponse>) => {
        state.isLoading = false;

        state.currentImage = action.payload.secure_url;
        state.currentImage = action.payload.public_id;
      },
    );
    builder.addCase(setCurrentImage.rejected, (state: InitialState) => {
      state.isLoading = false;
    });
  },
});

export default fileSlice.reducer;
