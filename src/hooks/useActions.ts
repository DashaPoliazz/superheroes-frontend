import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "../store/slices/superheroesSlice";
import { modaSliceActions } from "../store/slices/modalSlice";
import {
  loadSuperheroes,
  addNewSuperhero,
  removeSuperhero,
  updateSuperhero,
} from "../store/slices/superheroesSlice";

import { setCurrentImage, removeCurrentImage } from "../store/slices/fileSlice";

const actionsToBind = {
  ...actions,
  ...modaSliceActions,
  loadSuperheroes,
  addNewSuperhero,
  removeSuperhero,
  updateSuperhero,
  setCurrentImage,
  removeCurrentImage,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionsToBind, dispatch);
};
