import { MovieGeneralModel } from "./movie-general-model";

export class MovieDetailModel extends MovieGeneralModel {

  constructor() {
    super();
  }

  public backdrop_path: string = null;
  public budget: number = null;
  public genres: Array<{id: number, name: string }> = [];
  public id: number = null;
  public original_language: string = null;
  public overview: string = null;
  public popularity: number = null;
  public poster_path: string = null;
  public release_date: string = null;
  public revenue: number = null;
  public runtime: number = null;
  public title: string = null;
  public vote_average: number = null;
  public vote_count: number = null;
}
