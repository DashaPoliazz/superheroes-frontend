import { ISuperhero } from "./superhero";

export interface IPaginationSuperheroes {
  paginatedSuperheroes: ISuperhero[];
  totalpages: number;
}

export interface IPaginationParams {
  page: number;
  limit: number;
}
