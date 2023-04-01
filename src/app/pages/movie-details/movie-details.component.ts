// importing libraries
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

//importing movie api service
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';

//importing movie detail interface
import { MovieDetailInterface } from 'src/app/interface/movie-detail-interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  
  //declaring variables to store the api data
  movieId : string | any = ''
  movieDetail : MovieDetailInterface = {_id: '', movieName : '', movieDescription : '', movieGenres : [], moviePosterLink : '', trailerLink : '', releaseDate: '', createdAt: '',
  updatedAt: '', __v: -1, language : ''}

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

  constructor(private movieApiService : MovieApiServiceService, private router : ActivatedRoute, private sanatizer : DomSanitizer){
    
   
  }

  ngOnInit(): void {
     // extract movieId from url params
     this.movieId = this.router.snapshot.paramMap.get('id')
    
     // call the movie details api
     this.getMovieDetail(this.movieId)
  }

  getMovieDetail(id : string){
    this.movieApiService.getMovieDetails(id)
      .subscribe(res => {
        this.movieDetail = res.data
        console.log(res.data)
        this.movieDetail.trailerLink =  `https://www.youtube.com/embed/${res.data.trailerLink}?autoplay=1`
        this.movieDetail.trailerLink = this.sanatizer.bypassSecurityTrustResourceUrl(this.movieDetail.trailerLink)
        let date = new Date(res.data.releaseDate)
        this.movieDetail.releaseDate = `${ this.monthToMonthNameMap[date.getMonth() + 1] } ${date.getDate()}, ${date.getFullYear()}`
      }, error => console.log("Error in api call movie detail", error))
  }


}
