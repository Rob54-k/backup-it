import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from "../../services/app-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieDetailModel } from "../../models/movie-detail-model";
import { combineLatest, Subscription } from "rxjs";
import { AppStateService } from "../../services/app-state.service";
import { MovieModel } from "../../models/movie-model";
import { ErrorDialogComponent } from "../dialogs/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-movie-selected',
  templateUrl: './movie-selected.component.html',
  styleUrls: ['./movie-selected.component.scss']
})
export class MovieSelectedComponent implements OnInit, OnDestroy {
  public movieId: number;
  public movie: MovieDetailModel;
  public recommendationMovieList: MovieModel[] = [];
  public _subscription: Subscription[] = [];
  public genresList = [];
  public movieFavorites: Array<MovieModel | MovieDetailModel> = this._appDataService.getMoviesFavorites();

  constructor(
    public appStateService: AppStateService,
    private _appDataService: AppDataService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.movieId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.getMovieToId(this.movieId);
    this._subscription.push(combineLatest([this._appDataService.getRecommendationMovie(this.movieId), this._appDataService.getAllGenres()]).subscribe(
      (response) => {
        this.genresList = response[1];
        this.recommendationMovieList = this.prepareDate(response[0].results);
      },
      (error) => {
        this._dialog.open(ErrorDialogComponent);
      },
      () => {}
    ));
  }

  ngOnDestroy() {
    this._subscription.forEach((sub) => sub.unsubscribe());
  }

  public getMovieToId(id): void {
    this._subscription.push(this._appDataService.getMovieDetail(id).subscribe(
      (response) => {
        this.movie = response;
        if (this.movieFavorites.length) {
          this.movie.favorite = this.movieFavorites.some((item) => item.id === this.movie.id);
        }
      },
      (error) => {
        this._dialog.open(ErrorDialogComponent);
      },
      () => {}
    ));
    this._subscription.push(this._appDataService.getRecommendationMovie(id).subscribe(
      (response) => {
        this.recommendationMovieList = this.prepareDate(response.results);
      },
      (error) => {
        this._dialog.open(ErrorDialogComponent);
      },
      () => {}
    ));
  }

  public setGenre(genresList: Array<any>, genreId: number): string {
    let genre = null;
    genresList.forEach((item) => {
      if (item.id === genreId) {
        genre = item.name
      }
    });
    return genre;
  }

  public setMovieFavorite(movie: MovieDetailModel): void {
    let movieModel = new MovieModel();
    movie.genres.forEach((item) => {
      movieModel.genre_ids.push(item.id);
      movieModel.genres.push(item.name);
    });
    movieModel.vote_average = movie.vote_average;
    movieModel.title = movie.title;
    movieModel.poster_path = movie.poster_path;
    movieModel.id = movie.id;
    movieModel.favorite = !movie.favorite;

    movie.favorite = !movie.favorite;
    this._appDataService.setMovieToFavorites(movieModel);
  }

  public prepareDate(recommendationMovieData: MovieModel[]): MovieModel[] {
    let data: MovieModel[] = recommendationMovieData;

    data.forEach((movie: MovieModel) => {
      movie.genre_ids.forEach((id) => {
        if (this.movieFavorites.length) {
          movie.favorite = this.movieFavorites.some((item) => item.id === movie.id);
        }
        movie.genres.push(this.setGenre(this.genresList, id));
      })
    });

    return data;
  }

  public goToMovie(movieId: any) {
    this.getMovieToId(movieId);
    this._route.navigate([`/movie/${movieId}`])
  }
}
