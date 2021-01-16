import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AppStateService } from "./app-state.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(
    private _http: HttpClient,
    private _appState: AppStateService
  ) { }

  public getPopularMovieList(page): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this._appState.apiKey);
    params = params.append('page', page);
    return this._http.get(this._appState.apiUrl + '/movie/popular', { params });
  }

  public getAllGenres(): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this._appState.apiKey);
    return this._http.get(this._appState.apiUrl + '/genre/movie/list', { params });
  }

  public getMovieDetail(movieId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this._appState.apiKey);
    return this._http.get(this._appState.apiUrl + '/movie/' + movieId, { params });
  }

  public getSearchMovie(nameMovie): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this._appState.apiKey);
    params = params.append('query', nameMovie);
    return this._http.get(this._appState.apiUrl + '/search/movie', { params });
  }

  public getRecommendationMovie(movieId): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this._appState.apiKey);
    return this._http.get(this._appState.apiUrl + '/movie/' + movieId +'/recommendations', { params });
  }

}
