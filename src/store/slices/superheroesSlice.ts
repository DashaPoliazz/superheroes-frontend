import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { superheroService } from "../../services/SuperheroService";
import { ISuperhero } from "../../types/superhero";

interface SuperheroesInitialState {
  superheroes: ISuperhero[];
  totalPages: number | null;
  activeSuperhero: string;
  isLoading: boolean;
}

const initialState: SuperheroesInitialState = {
  superheroes: [],
  activeSuperhero: "",
  totalPages: null,
  isLoading: false,
};

export const loadSuperheroes = createAsyncThunk(
  "api/loadSuperheroes",
  async () => {
    const response = await superheroService.fetchSuperheroes();

    return response.data;
  },
);

export const addNewSuperhero = createAsyncThunk(
  "api/addSuperhero",
  async (superheroToAdd: ISuperhero) => {
    const response = await superheroService.addSuperhero(superheroToAdd);

    return response.data;
  },
);

export const removeSuperhero = createAsyncThunk(
  "api/remove",
  async (superheroToRemoveId: string) => {
    const response = await superheroService.removeSuperhero(
      superheroToRemoveId,
    );

    return response.data;
  },
);

export const updateSuperhero = createAsyncThunk(
  "api/update",
  async (superheroToUpdate: ISuperhero) => {
    const response = await superheroService.updateSuperhero(superheroToUpdate);

    return response.data;
  },
);

const superheroSlice = createSlice({
  name: "superhero",
  initialState,
  reducers: {
    setActiveSuperhero: (
      state: SuperheroesInitialState,
      action: PayloadAction<string>,
    ) => {
      state.activeSuperhero = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadSuperheroes.pending,
      (state: SuperheroesInitialState) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      loadSuperheroes.fulfilled,
      (state: SuperheroesInitialState, action: PayloadAction<ISuperhero[]>) => {
        state.isLoading = false;

        state.superheroes = action.payload;
      },
    );
    builder.addCase(
      loadSuperheroes.rejected,
      (state: SuperheroesInitialState) => {
        state.isLoading = false;
      },
    );
    // addNewSuperhero
    builder.addCase(
      addNewSuperhero.pending,
      (state: SuperheroesInitialState) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      addNewSuperhero.fulfilled,
      (state: SuperheroesInitialState) => {
        state.isLoading = false;
      },
    );
    builder.addCase(
      addNewSuperhero.rejected,
      (state: SuperheroesInitialState, action: any) => {
        state.isLoading = false;

        if (action.payload) {
          state.superheroes.push(action.payload);
        }
      },
    );
    // Remove superhero
    builder.addCase(
      removeSuperhero.pending,
      (state: SuperheroesInitialState) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      removeSuperhero.fulfilled,
      (state: SuperheroesInitialState, action: PayloadAction<ISuperhero>) => {
        state.isLoading = false;

        state.superheroes = state.superheroes.filter(
          superhero => superhero._id !== action.payload._id,
        );
      },
    );
    builder.addCase(
      removeSuperhero.rejected,
      (state: SuperheroesInitialState) => {
        state.isLoading = false;
      },
    );
    // UpdateSuperhero
    builder.addCase(
      updateSuperhero.pending,
      (state: SuperheroesInitialState) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      updateSuperhero.fulfilled,
      (state: SuperheroesInitialState) => {
        state.isLoading = false;
      },
    );
    builder.addCase(
      updateSuperhero.rejected,
      (state: SuperheroesInitialState) => {
        state.isLoading = false;
      },
    );
  },
});

export const actions = superheroSlice.actions;
export default superheroSlice.reducer;
