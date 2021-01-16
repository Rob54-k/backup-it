import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public apiKey: string = '578f257c2888873c0135dab2f6824186';
  public apiUrl: string = 'https://api.themoviedb.org/3';
  public imageUrl: string = 'https://image.tmdb.org/t/p/original/';
  public theMovieDatabaseListId: number = 7072325;
  public sessionId = '';

  constructor() { }
}
