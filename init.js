import { MovieViewer } from "./movie-viewer.js";
import { Card, closeMovieViewer } from "./card.js";   //Card>CardsViewer>Navigation
import CardsViewer from "./cards-viewer.js";
import { Navigation } from "./navigator.js";

let CARDSVIEWER;
export async function renderViewer(firstRequestApi) {
    if (closeMovieViewer.MOVIE_VIEWER) closeMovieViewer();
    //clear main-frame
    mainFrame.innerHTML = ``;


    CARDSVIEWER = new CardsViewer();
    CARDSVIEWER.firstRequestApi = firstRequestApi;
    await CARDSVIEWER.fetchFirstMovies();
    console.log(CARDSVIEWER.firstRespond);
    console.log('**********************');
    CARDSVIEWER.firstRespond.results.forEach(resultEl => {
        CARDSVIEWER.appendingEl.append(new Card(resultEl).el);
    })
    mainFrame.append(CARDSVIEWER.frame);

    console.log(CARDSVIEWER);
    if (CARDSVIEWER.total_pages < 20) return;
    CARDSVIEWER.navigationEls = new Navigation(CARDSVIEWER)

}







const searchInput = document.getElementById('search-input')
searchInput.onInput = function (e) {
    let key = e.target.value;
    if (!key) return;
    renderViewer(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${key}&page=1&include_adult=false`)
}
searchInput.addEventListener(`input`, searchInput.onInput);



const discover = document.getElementById('discover');
discover.onClick = function (e) {
    renderViewer(firstDiscoverApi);
    currentFrame = menuEls.discover;
}
discover.addEventListener('click', discover.onClick);

const trends = document.getElementById('trends')
trends.onClick = function () {
    renderViewer(firstTrendsApi);
    currentFrame = menuEls.trends;
}
trends.addEventListener('click', trends.onClick);


const movies = document.getElementById('movies')
trends.onClick = function () {
    renderViewer(firstMoviesApi);
    currentFrame = menuEls.movies;
}
movies.addEventListener('click', trends.onClick);

const series = document.getElementById('series')
trends.onClick = function () {
    renderViewer(firstSeriesApi);
    currentFrame = menuEls.series;
}
series.addEventListener('click', trends.onClick);

discover.onClick(null);

document.documentElement.addEventListener('click', e => {
    setTimeout(() => {
        onMouseEnter(currentFrame);

    }, 100);
})