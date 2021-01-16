import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MovieModel } from "../models/movie-model";
import { AppApiService } from "./app-api.service";
import { MovieDetailModel } from "../models/movie-detail-model";
import { AppStateService } from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public movieList: MovieModel[] = [];
  public movie: MovieModel;
  public movieDetail: MovieDetailModel;
  public genresList: Array<{id: number, name: string }> = [];
  public moviesFavorite: MovieModel[] = [];

  constructor(
    private _apiService: AppApiService,
    private _appStateService: AppStateService
  ) { }

  public getPopularMovieList(page): Observable<any> {
    return new Observable<MovieModel[]>(observer => {
      this._apiService.getPopularMovieList(page).subscribe(
        (response) => {
          if (response.results) {
            this.movieList = [];
            this.movie = new MovieModel();
            response.results.forEach((item: MovieModel) => {
              this.movie = MovieModel.xerox(item, new MovieModel());
              this.movieList.push(this.movie);
            });
            response.results = this.movieList;
          }
          observer.next(response);
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getAllGenres(): Observable<any> {
    return new Observable<any>(observer => {
      this._apiService.getAllGenres().subscribe(
        (response) => {
          this.genresList = response.genres;
          observer.next(response.genres);
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getMovieDetail(movieId): Observable<MovieDetailModel> {
    return new Observable<MovieDetailModel>(observer => {
      this._apiService.getMovieDetail(movieId).subscribe(
        (response) => {
          if (response) {
            this.movieDetail = new MovieDetailModel();
            this.movieDetail = MovieDetailModel.xerox(response, new MovieDetailModel());
            observer.next(this.movieDetail);
          }
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getSearchMovie(nameMovie): Observable<any> {
    return new Observable<MovieModel[]>(observer => {
      this._apiService.getSearchMovie(nameMovie).subscribe(
        (response) => {
          if (response.results) {
            this.movieList = [];
            this.movie = new MovieModel();
            response.results.forEach((item: MovieModel) => {
              this.movie = MovieModel.xerox(item, new MovieModel());
              this.movieList.push(this.movie);
            });
            response.results = this.movieList;
          }
          observer.next(response);
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getRecommendationMovie(movieId): Observable<any> {
    return new Observable<MovieModel[]>(observer => {
      this._apiService.getRecommendationMovie(movieId).subscribe(
        (response) => {
          if (response.results) {
            this.movieList = [];
            this.movie = new MovieModel();
            response.results.forEach((item: MovieModel) => {
              this.movie = MovieModel.xerox(item, new MovieModel());
              this.movieList.push(this.movie);
            });
            response.results = this.movieList;
          }
          observer.next(response);
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public setMovieToFavorites(movie: MovieModel | MovieDetailModel) {
    let currentFavorites: any = JSON.parse(localStorage.getItem("favoriteMovies"));

    if (!currentFavorites) {
      currentFavorites = [];
    }

    if (!currentFavorites.length) {
      currentFavorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(currentFavorites));
    } else {

      if (currentFavorites.find((item) => item.id === movie.id)) {
        currentFavorites = currentFavorites.filter((item) => item.id !== movie.id);
      } else {
        currentFavorites.push(movie);
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(currentFavorites));
    }

  }

  public getMoviesFavorites() {
    let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));

    if (favoriteMovies) {
      return favoriteMovies;
    } else {
      return []
    }
  }

  // public addMovieToFavorite(movieId) {
  //   this._apiService.createMovieToFavoriteList(movieId).subscribe(
  //     (response) => {},
  //     (error) => {},
  //     () => {}
  //   );
  // }
  //
  // public removeMovieFromFavorite(movieId) {
  //   this._apiService.removeMovieFromFavoriteList(movieId).subscribe(
  //     (response) => {},
  //     (error) => {},
  //     () => {}
  //   );
  // }
}
