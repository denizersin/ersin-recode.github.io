import { renderViewer } from "./init.js";
export class MovieViewer {


  constructor(respond) {
    this.respond = respond;
    console.log(this.respond);

    this.el = undefined;
    this.team = undefined;
    this.backdrop_pathImg = undefined;
    this.nameSpan = undefined;
    this.waitResources = [];
    //this.fetchRequests();



  }

  setEl() {

    this.el = document.createElement('div');
    this.el.className = 'movie-viewer';
    this.el.innerHTML = `
        <div id="back" class="back"><i class="fa-solid fa-angle-left"></i></div>

        <div class="content1 content">
        <img src="https://image.tmdb.org/t/p/w1280${this.respond.backdrop_path}" alt="" class="hide">

        <div class="namec">
          <span class="poster-name hide">${this.respond.name || this.respond.original_title}</span>
        </div> <!-- absolute -->

        <div class="posterc">
          <img id="poster" src="https://image.tmdb.org/t/p/w1280${this.respond.backdrop_path}" class="hide">
        </div>

        <div class="video">
        <video tabindex="-1" class="video-stream html5-main-video" webkit-playsinline="" playsinline="" controlslist="nodownload"  src="">
        <source src="/media/cc0-videos/flower.webm" type="video/webm">
        </video>
        </div> <!-- 100% absolute -->

      </div>
      <div class="content2 content hide">
        <span id="watch-trailer">Watch Trailer</span>
      </div>
`+
      `<div class="content3 content hide ">
        ${this.respond.genre_ids.map(e => {
        return '<span class="genre" id="' + e + `">` + getGenreById(e) + '</span>'
      }).join('')}
         </div>`+

      ` <div class="content4 content hide">
            <div class="rating">${this.respond.vote_average}</div></div>
      <div class="content5 content hide ">${this.respond.overview}</div>`
      +
      `
      <div class="content6 content hide">
      <span>Casts</span>
      <div class="casts">`
      +
      this.team.cast.map((e, i) => {
        if (i > 10) return;
        return (`<div class="cast">` +
          `<img src="https://image.tmdb.org/t/p/w1280/` + e.profile_path + ` "alt="" class="actor">` +
          `<span class="name">` + e.name + `</span>` +
          `<span class="character">` + e.character + `</span>` +
          `</div>`)
      }).join('') +

      `</div>

    </div>
      `;
    console.log(this.el.innerHTML);
    movieViewer.innerHTML = '';
    this.backdrop_pathImg = this.el.querySelector('.posterc>img#poster');
    this.nameSpan = this.el.querySelector('.namec>span.poster-name');
    this.back = this.el.querySelector('#back');

    let images = this.el.querySelectorAll('.content1 img');
    Array.from(images).map(e => {
      this.waitResources.push(new Promise((resolve, reject) => {
        e.onload = resolve;
        e.onerror = reject;
      }))
    })
    this.iframe = this.el.querySelector('video');
    this.watchTrailer = this.el.querySelector('#watch-trailer');

    this.el.querySelectorAll('span.genre').forEach(e =>
      e.addEventListener('click', ev => {
        renderViewer(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1/&with_genres=${e.id}`)
      }))

  }
  async fetchRequests() {
    let team = await fetch(`https://api.themoviedb.org/3/movie/${this.respond.id}/credits?api_key=${API_KEY}&language=en-US`)
    this.team = await team.json();
    this.setEl();
    movieViewer.append(this.el);
    await promiseFor(20);
    console.log(this.waitResources);
    return this.waitResources;

  }


}

console.log('asdasd=123'.indexOf('='));