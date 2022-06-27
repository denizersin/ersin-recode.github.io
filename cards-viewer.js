export default class CardsViewer {

    constructor() {
        //start loading anim
        this.frame = undefined;
        this.currentPage = 0;
        this.total_pages = undefined;
        this.total_results = undefined;
        this.navigationEls = undefined;
        this.firstRequestApi = firstDiscoverApi;
        this.firstRespond = undefined;
        this.appendingEl = undefined;
        this.setEl();
    }

    setEl() {

        this.frame = document.createElement('div');
        this.frame.id = 'cards-viewer';
        this.frame.innerHTML = `
        <div class="cards-container">
        <!-- movie card -->
        <!-- movie card -->
        </div>
`

        this.appendingEl = this.frame.firstElementChild;
        console.log(this.appendingEl, 's');
    }

    async fetchFirstMovies() {
        let respond = await fetch(this.firstRequestApi);
        respond = await respond.json();
        this.firstRespond = respond;
        this.total_pages = respond.total_pages;
        this.total_results = respond.total_results;
        return new Promise((resolve, reject) => {
            resolve();
        })
    }


}




