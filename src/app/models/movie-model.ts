import { MovieGeneralModel } from "./movie-general-model";

export class MovieModel extends MovieGeneralModel {

  constructor() {
    super();
  }

  public id: number = null;
  public genre_ids: Array<number> = [];
  public title: string = null;
  public poster_path: string = null;
  public vote_average: number = null;
  public genres: Array<string> = [];



}
