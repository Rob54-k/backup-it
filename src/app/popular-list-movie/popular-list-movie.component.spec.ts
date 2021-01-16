import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularListMovieComponent } from './popular-list-movie.component';

describe('PopularListMovieComponent', () => {
  let component: PopularListMovieComponent;
  let fixture: ComponentFixture<PopularListMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularListMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularListMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
