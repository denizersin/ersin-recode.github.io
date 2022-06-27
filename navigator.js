import { Card } from "./card.js";

export class Navigation {

    constructor(CARDSVIEWER) {
        this.el = undefined;
        this.total_pages = CARDSVIEWER.firstRespond.total_pages;
        console.log(this.total_pages);
        this.total_results = CARDSVIEWER.firstRespond.total_results;
        this.currentPage = 1;
        this.requestApi = CARDSVIEWER.firstRequestApi;
        this.parent = CARDSVIEWER.frame; //cards will be appen in parent
        this.cardParent = CARDSVIEWER.appendingEl;
        this.menuEls = undefined;
        this.setAndAppenEl();
        this.setEvents();
    }

    setAndAppenEl() {
        this.el = document.createElement('div');
        this.el.id = 'page-nav';
        let str = [];
        for (let i = 1; i <= this.total_pages; i++) {
            str.push(`<div class="page${i} number">${i}</div>`)
            if (i == 5) break;
        }
        this.el.innerHTML = `
        
        <div class="nav-container">
            <div class="first current">1</div>

            <div class="back">back</div>
            ${str.join('')} 
            <!-- 1,2,3,4,5 -->
            <div class="next">next</div>
            <div class="last">${this.total_pages}</div>
      </div>
        
        `
        this.parent.append(this.el);
    }
    setEvents() {
        this.menuEls = Array.from(this.el.firstElementChild.children);
        //first pageBtn(1)
        this.menuEls[0].addEventListener('click', e => {
            if (this.currentPage == 1) return;
            this.goToPage(0);
        });

        //last
        this.menuEls[this.menuEls.length - 1].addEventListener('click', e => {
            if (this.currentPage == this.total_pages) return;
            this.goToPage(this.menuEls.length - 1);
        })

        //back
        this.menuEls[1].addEventListener('click', e => {
            if (this.total_pages <= 5 || this.menuEls[2].innerHTML == '1') return;
            this.menuEls.forEach(e => {
                if (!e.classList.contains('number')) return;
                if (e.style.display != 'none') {
                    let a = parseInt(e.innerHTML);
                    e.innerHTML = (a - 5);
                }
            })
        })

        //next
        this.menuEls[this.menuEls.length - 2].addEventListener('click', e => {
            if (this.total_pages <= 5 || this.menuEls[this.menuEls.length - 2].innerHTML == this.total_pages) return;
            this.menuEls.forEach(e => {
                if (!e.classList.contains('number')) return
                let a = parseInt(e.innerHTML);
                if (a + 5 > this.total_pages) {
                    e.style.display = 'none';
                }
                else {
                    e.innerHTML = (a + 5);
                }
            })
        })


        this.menuEls.forEach((el, index) => {
            if (el.classList.contains('number')) {
                let i = index;
                console.log(i);
                el.addEventListener('click', e => {
                    this.goToPage(i);
                })
            }
        })

    }

    async goToPage(menuIndex) {
        let pageNum = this.menuEls[menuIndex].innerHTML;
        this.menuEls.forEach(e => { e.classList.remove('current') });
        this.menuEls[menuIndex].classList.add('current');
        console.log(pageNum);
        this.requestApi = this.requestApi.replace(`page=${this.currentPage}`, `page=${pageNum}`);
        this.currentPage = pageNum;
        let respond = await fetch(this.requestApi);
        respond = await respond.json();

        this.cardParent.innerHTML = '';
        respond.results.forEach(resultEl => {
            this.cardParent.append(
                new Card(resultEl).el
            )
        });

    }
}

