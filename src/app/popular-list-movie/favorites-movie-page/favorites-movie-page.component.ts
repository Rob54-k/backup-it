import { Component, OnInit } from '@angular/core';
import { MovieModel } from "../../models/movie-model";
import { AppDataService } from "../../services/app-data.service";
import { Router } from "@angular/router";
import { MovieDetailModel } from "../../models/movie-detail-model";

@Component({
  selector: 'app-favorites-movie-page',
  templateUrl: './favorites-movie-page.component.html',
  styleUrls: ['./favorites-movie-page.component.scss']
})
export class FavoritesMoviePageComponent implements OnInit {
  public movieList: Array<MovieModel | MovieDetailModel> = this._appDataService.getMoviesFavorites();
  public isFavorites: boolean = false;

  constructor(
    private _appDataService: AppDataService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    if (!this.movieList.length) {
      this.isFavorites = true;
    }
  }

  public goToMovieAbout(movieId: number) {
    this._route.navigate([`/movie/${movieId}`]);
  }

  public deleteFavorite(movieId: number) {
   this.movieList = this.movieList.filter((item) => item.id !== movieId);

   if (!this.movieList.length) {
     this.isFavorites = true;
   }
  }
}
