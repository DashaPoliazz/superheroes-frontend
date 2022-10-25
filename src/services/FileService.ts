import { $axios } from "../api/api";
import { AxiosResponse } from "axios";
import { IFileResponse } from "../types/FileResponse";

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
}

export const fileService = new FileService();
