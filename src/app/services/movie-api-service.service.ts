//importing libraries
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

//importing interfaces
import { MoviesApiInterface } from '../interface/movies-api-interface';
import { MovieApiInterface } from '../interface/movie-api-interface';


@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  
  constructor(private http: HttpClient) { }

  baseUrl = 'https://movie-app-backend-production-efbb.up.railway.app/movie'
  
  getMovies(): Observable<MoviesApiInterface>{
    return this.http.get<MoviesApiInterface> (`${this.baseUrl}/all`)
  }

  getMovieDetails(id: string) : Observable<MovieApiInterface>{
    return this.http.get<MovieApiInterface>(`${this.baseUrl}/by/movieId?movieId=${id}`)
  }

  getMoviePoster(key: string) {
    return this.http.get(`${this.baseUrl}/poster?posterKey=${key}`, {responseType: 'blob'})
  }

  
}
