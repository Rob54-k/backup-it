import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieModel } from "../../models/movie-model";
import { AppStateService } from "../../services/app-state.service";
import { AppDataService } from "../../services/app-data.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: MovieModel;
  @Output() goToMovieAbout: EventEmitter<any> = new EventEmitter();
  @Output() deleteFavorite: EventEmitter<any> = new EventEmitter();

  constructor(
    public appState: AppStateService,
    private _appDataService: AppDataService
  ) { }

  ngOnInit(): void {}

  public goToMovie(movieId) {
    this.goToMovieAbout.emit(movieId);
  }

  public setFavorite(movie: MovieModel) {
    this.movie.favorite = !this.movie.favorite;
    this._appDataService.setMovieToFavorites(movie);
    this.deleteFavorite.emit(movie.id);
  }
}
