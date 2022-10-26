import { $axios } from "../api/api";
import { AxiosResponse } from "axios";
import { IDeleteOptions, IFileResponse } from "../types/FileResponse";
import { ISuperhero } from "../types/superhero";

class FileService {
  setImage(
    currentImage: File,
    superheroId: string,
  ): Promise<AxiosResponse<IFileResponse>> {
    const formData = new FormData();

    formData.append("currentImage", currentImage);
    formData.append("superheroId", superheroId);

    return $axios.post<IFileResponse>("/image", formData);
  }

  removeImage(options: IDeleteOptions): Promise<AxiosResponse<ISuperhero>> {
    return $axios.delete<ISuperhero>("/image", {
      data: options,
    });
  }
}

export const fileService = new FileService();
