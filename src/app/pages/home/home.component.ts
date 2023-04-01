// importing libraries
import { Component, OnInit } from '@angular/core';

//importing services
import {MovieApiServiceService} from '../../services/movie-api-service.service'

//importing interfaces
import { MoviesApiInterface } from 'src/app/interface/movies-api-interface';
import { MovieInterface } from 'src/app/interface/movie-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  //declaring variables to store the api data
  movieList : MovieInterface[]  = []
  base64Data : any
  retrievedImage : any
  clickedCardIndex : number = -1
  selectedMovie : MovieInterface = {movieDescription: '', movieName : '', _id: '', releaseDate : '', moviePosterLink : ''}
  movieModalRef : any 

  //map to store the month number and month name
  monthToMonthNameMap : any = {
    1 : 'Jan',
    2 : 'Feb',
    3 : 'Mar',
    4 : 'Apr',
    5 : 'May',
    6 : 'Jun',
    7 : 'Jul',
    8 : 'Aug',
    9 : 'Sep',
    10: 'Oct',
    11 : 'Nov',
    12 : 'Dec'
  }

  constructor(private movieApiService: MovieApiServiceService) {}

  ngOnInit(){
    this.movieApiService.getMovies()
    .subscribe((resp: MoviesApiInterface) => {
      resp.data.map((m, i) => {
        this.movieList.push(m)
        this.movieApiService.getMoviePoster(m.moviePosterLink)
          .subscribe(data => {
            const reader = new FileReader()
            reader.onloadend = () => {
              this.movieList[i].moviePosterLink = reader.result
            }
            reader.readAsDataURL(data)
          })
        let date = new Date(m.releaseDate)
        this.movieList[i].releaseDate = `${date.getDate()}, ${ this.monthToMonthNameMap[date.getMonth() + 1] } ${date.getFullYear()}`
      })
    }, (error) => {
      console.log(error)
    })
  }


  getIndexOfClickedCard(index : number){
    console.log("index ", index)
    this.clickedCardIndex = index;
    this.selectedMovie = this.movieList[index]
  }

  closeModal(){
    document.getElementById('movie-modal-close')?.click()
  }


}
