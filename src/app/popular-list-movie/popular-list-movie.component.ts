import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppDataService } from "../services/app-data.service";
import { MovieModel } from "../models/movie-model";
import { combineLatest, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { MovieDetailModel } from "../models/movie-detail-model";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "./dialogs/error-dialog/error-dialog.component";

@Component({
  selector: 'app-popular-list-movie',
  templateUrl: './popular-list-movie.component.html',
  styleUrls: ['./popular-list-movie.component.scss']
})
export class PopularListMovieComponent implements OnInit, OnDestroy {
  public value: string = '';
  public movieList: MovieModel[];
  public currentPage: number = 1;
  public totalPage: number;
  public genresList = [];
  public _subscription: Subscription[] = [];
  public isLoader: boolean = true;
  public timeout = null;
  public moviesFavorites: Array<MovieModel | MovieDetailModel> = this._appDataService.getMoviesFavorites();


  constructor(
    private _appDataService: AppDataService,
    private _route: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._subscription.push(combineLatest([this._appDataService.getAllGenres(), this._appDataService.getPopularMovieList(this.currentPage)]).subscribe(
      (response) => {
        this.movieList = response[1].results;
        this.currentPage = response[1].page;
        this.totalPage = response[1].total_results;
        this.genresList = response[0];
        this.movieList.forEach((movie: MovieModel) => {
          if (this.moviesFavorites) {
            movie.favorite = this.moviesFavorites.some((item) => item.id === movie.id);
          }
          movie.genre_ids.forEach((id) => {
            movie.genres.push(this.setGenre(this.genresList, id));
          })
        });
      },
      (error) => {
        this._dialog.open(ErrorDialogComponent);
      },
      () => {
        this.isLoader = false;
      }
    ));
  }

  ngOnDestroy() {
    this._subscription.forEach((sub) => sub.unsubscribe());
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

  public onPaginateChange(event): void {
    this.isLoader = true;
    this._subscription.push(this._appDataService.getPopularMovieList(event.pageIndex + 1).subscribe(
      (response) => {
        this.setData(response);
      },
      (error) => {
        this._dialog.open(ErrorDialogComponent);
      },
      () => {
        this.isLoader = false;
      }
    ));
  }


  public searchMovie(value): void {
    clearTimeout(this.timeout);
    this.isLoader = true;
    this.timeout = setTimeout(() => {
      if (value.trim() === '') {
        this._subscription.push(this._appDataService.getPopularMovieList(1).subscribe(
          (response) => {
            this.setData(response)
          },
          (error) => {
            this._dialog.open(ErrorDialogComponent);
          },
          () => {
            this.isLoader = false;
          }
        ));
      }
      if (value) {
        this._subscription.push(this._appDataService.getSearchMovie(value).subscribe(
          (response) => {
            this.setData(response);
          },
          (error) => {
            this._dialog.open(ErrorDialogComponent);
          },
          () => {
            this.isLoader = false;
          }
        ));
      }
    }, 1000);
  }

  public setData(response): void {
    this.movieList = response.results;
    this.currentPage = response.page;
    this.totalPage = response.total_results;
    this.movieList.forEach((movie: MovieModel) => {
      movie.genre_ids.forEach((id) => {
        if (this.moviesFavorites.length) {
          movie.favorite = this.moviesFavorites.some((item) => item.id === movie.id);
        }
        movie.genres.push(this.setGenre(this.genresList, id));
      })
    });
  }

  public goToMovieAbout(id: number) {
    this._route.navigate([`/movie/${id}`])
  }
}
