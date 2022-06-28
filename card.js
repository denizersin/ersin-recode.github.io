import { MovieViewer } from "./movie-viewer.js";

console.log('cardjs');
export class Card {
  constructor(respond) {
    this.respond = respond;
    this.el = undefined;
    this.poster_path_img = undefined;
    this.nameSpan = undefined;
    this.MOVIE_VIEWER = undefined;
    this.setEl();
    this.onClick = this.onClick.bind(this);
    this.setEvents();
  }

  setEl() {

    this.el = document.createElement('div');
    this.el.className = `movie-card`;
    this.el.innerHTML = `

        <div class="imgc">
          <img src="https://image.tmdb.org/t/p/w500${this.respond.poster_path}" alt=""> 
        </div>

        <div class="movie-infoc">
          <span class="name">${this.respond.original_title || this.respond.name}</span>
        </div>

        <div class="row">
          <div class="row_"></div>
        </div>

        <div class="movie-card-popup">

          <div class="namec">
            <span class="name">${this.respond.original_title || this.respond.name}</span>
          </div>
          <div class="genrec">
            ${this.respond.genre_ids.map(id => {
      return `<span class="genre">` + getGenreById(id) + `</span>`
    })}
          </div>

          <div class="ratingc">
            <span class="rating">rating: ${this.respond.vote_average}</span>
          </div>


        </div>


        `
    this.poster_path_img = this.el.firstElementChild.firstElementChild;
    this.nameSpan = this.el.children[1].firstElementChild;
    //this.poster_path_img=this.el.querySelector('');

  }

  async onClick(e) {

    movieViewer.style.visibility = 'visible'
    document.body.style.overflow = 'hidden';
    this.MOVIE_VIEWER = new MovieViewer(this.respond);

    //loading...
    await this.MOVIE_VIEWER.fetchRequests();


    translateElem(this.MOVIE_VIEWER.nameSpan, this.nameSpan);
    translateElem2(this.MOVIE_VIEWER.backdrop_pathImg, this.poster_path_img);
    await promiseFor(10);

    [this.MOVIE_VIEWER.nameSpan, this.nameSpan, this.MOVIE_VIEWER.backdrop_pathImg, this.poster_path_img].forEach(e => {
      e.style.visibility = 'visible';
      e.style.transition = 'all .6s cubic-bezier(0.165, 0.84, 0.44, 1)'
    })
    await promiseFor(10);

    this.MOVIE_VIEWER.nameSpan.style.transform = '';
    this.MOVIE_VIEWER.backdrop_pathImg.style.transform = '';
    movieViewer.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)'
    movieViewer.style.backgroundColor = 'black';


    this.MOVIE_VIEWER.el.querySelectorAll('.content.hide').forEach((e, i) => {
      e.style.transition = `all .3s cubic-bezier(0.165, 0.84, 0.44, 1) ${(i + 1) * 100}ms`;
      e.style.opacity = '1';
      e.style.transform = 'translateY(0px)';
    });

    //back click...
    closeMovieViewer.MOVIE_VIEWER = this.MOVIE_VIEWER;
    this.MOVIE_VIEWER.back.addEventListener('click', closeMovieViewer)
    
    await promiseFor(1000);
    [this.MOVIE_VIEWER.nameSpan, this.nameSpan, this.MOVIE_VIEWER.backdrop_pathImg, this.poster_path_img].forEach(e => {
      e.style.transition = '';
    })
  }
  setEvents() {
    this.el.onClick = this.onClick;
    this.el.addEventListener('click', this.onClick)
  }
}


export function closeMovieViewer() {
  closeMovieViewer.MOVIE_VIEWER.el.style.display = 'none';
  document.body.style.overflow = 'visible';
  closeMovieViewer.MOVIE_VIEWER = null;
  movieViewer.style.backgroundColor = 'transparent';

}