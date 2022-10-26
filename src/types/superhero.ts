export interface IPicture {
  imageUrl: string;
  public_id: string;
}

export interface ISuperhero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  currentImage: IPicture | null;
  Images: IPicture[];
  _id?: string;
  __v?: number;
}
