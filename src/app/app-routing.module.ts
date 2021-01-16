import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularListMovieComponent } from "./popular-list-movie/popular-list-movie.component";
import { MovieSelectedComponent } from "./popular-list-movie/movie-selected/movie-selected.component";
import { FavoritesMoviePageComponent } from "./popular-list-movie/favorites-movie-page/favorites-movie-page.component";


const routes: Routes = [
  {path: '', component: PopularListMovieComponent},
  {path: 'movie/:id', component: MovieSelectedComponent},
  {path: 'favorites', component: FavoritesMoviePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
