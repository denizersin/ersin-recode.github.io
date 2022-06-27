console.log('global js');
let API_KEY = `b51b535b2fa399a23d7dfdf78f4f91c3`;
let firstDiscoverApi = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`;
let firstTrendsApi = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`;
let firstMoviesApi = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
let firstSeriesApi = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`

const movieViewer = document.getElementById('movie-viewer-frame');

let genres;
const mainFrame = document.getElementById('main-frame');
console.log(mainFrame);
fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(r => {
    return r.json();
}).then(r => {
    genres = r.genres;
})

let GENRES;
async function getGenres() {
    let gender1 = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`);
    gender1 = await gender1.json();
    gender1 = gender1.genres
    let gender2 = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    gender2 = await gender2.json();
    gender2 = gender2.genres
    GENRES = gender1.concat(gender2);
    return Promise.resolve();
}

function getGenreById(id) {
    return GENRES.filter(e => e.id == id)[0].name
}

function getGenreApi(genre) {

}


function promiseFor(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}




// I DIDN'T CONSIDER tranform origin :/

//calculate to translate elem1 to elem2 with scale and translate3d
function translateElem(elem1, elem2) {
    console.log(elem1, elem2, 's');
    let bound1 = elem1.getBoundingClientRect();
    let bound2 = elem2.getBoundingClientRect();
    const scXrate = elem2.offsetWidth / elem1.offsetWidth;
    const scYrate = elem2.offsetHeight / elem1.offsetHeight;
    console.log(elem2.offsetHeight, elem1.offsetHeight, 'h');
    console.log(elem1, elem2);
    const expandingX = (elem1.offsetWidth * (scXrate - 1)) / 2;
    const expandingY = (elem1.offsetHeight * (scYrate - 1)) / 2;
    let dx = bound2.x - (bound1.x - expandingX);
    dx = dx / scXrate;
    let dy = bound2.y - (bound1.y - expandingY);
    dy = dy / scYrate;
    elem1.style.transform = `scale(${scXrate},${scYrate}) translate3d(${dx}px,${dy}px,${0}px)`
    console.log(scXrate, scYrate, dx, dy);
}

//width>height reverse!
function translateElem2(elem1, elem2) {
    console.log(elem1, elem2, 's');
    let bound1 = elem1.getBoundingClientRect();
    let bound2 = elem2.getBoundingClientRect();
    const scXrate = elem2.offsetHeight / elem1.offsetWidth;
    const scYrate = elem2.offsetWidth / elem1.offsetHeight;
    const expandingX = (elem1.offsetWidth * (scXrate - 1)) / 2;
    const expandingY = (elem1.offsetHeight * (scYrate - 1)) / 2;
    let dx = bound2.x - (bound1.x - expandingX);
    dx = dx / scXrate;
    let dy = bound2.y - (bound1.y - expandingY);
    dy = dy / scYrate;
    elem1.style.transform = `scale(${scXrate},${scYrate}) translate3d(${dx}px,${dy}px,${0}px) rotate(90deg)`
}




