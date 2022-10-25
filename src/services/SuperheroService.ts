import { $axios } from "../api/api";
import { AxiosResponse } from "axios";
import { ISuperhero } from "../types/superhero";
import {
  IPaginationParams,
  IPaginationSuperheroes,
} from "../types/paginationConfig";

class SuperheroService {
  fetchSuperheroes(): Promise<AxiosResponse<ISuperhero[]>> {
    return $axios.get<ISuperhero[]>("/superhero");
  }

  addSuperhero(superheroData: any): Promise<AxiosResponse<ISuperhero[]>> {
    return $axios.post<ISuperhero[]>("/superhero", superheroData);
  }

  removeSuperhero(
    superheroToRemoveId: string,
  ): Promise<AxiosResponse<ISuperhero>> {
    return $axios.delete<ISuperhero>(`/superhero/${superheroToRemoveId}`);
  }

  updateSuperhero(
    superheroToUpdate: ISuperhero,
  ): Promise<AxiosResponse<ISuperhero>> {
    return $axios.put<ISuperhero>("/superhero", superheroToUpdate);
  }
}

export const superheroService = new SuperheroService();
