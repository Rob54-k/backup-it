import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopularListMovieComponent } from './popular-list-movie/popular-list-movie.component';
import { MovieSelectedComponent } from './popular-list-movie/movie-selected/movie-selected.component';
import { MovieComponent } from './popular-list-movie/movie/movie.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HttpClientModule } from "@angular/common/http";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TruncatePipe } from './pipes/truncate.pipe';
import { NavBarComponent } from './popular-list-movie/nav-bar/nav-bar.component';
import { FavoritesMoviePageComponent } from './popular-list-movie/favorites-movie-page/favorites-movie-page.component';
import { ErrorDialogComponent } from './popular-list-movie/dialogs/error-dialog/error-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    PopularListMovieComponent,
    MovieSelectedComponent,
    MovieComponent,
    TruncatePipe,
    NavBarComponent,
    FavoritesMoviePageComponent,
    ErrorDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
